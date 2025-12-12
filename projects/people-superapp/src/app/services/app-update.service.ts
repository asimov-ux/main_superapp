import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first, concat, interval } from 'rxjs';

export interface UpdateAvailableEvent {
  type: 'UPDATE_AVAILABLE';
  current: { hash: string; appData?: any };
  available: { hash: string; appData?: any };
}

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  private updateAvailable = false;

  constructor(private swUpdate: SwUpdate, private appRef: ApplicationRef) {}

  /**
   * Inicializa o serviço de atualização
   * Deve ser chamado no AppComponent.ngOnInit()
   */
  initialize(): void {
    if (!this.swUpdate.isEnabled) {
      console.warn('⚠️ Service Worker não está habilitado');
      return;
    }

    // Registrar SW quando app estabilizar (após 30s)
    this.registerWhenStable();

    // Monitorar atualizações disponíveis
    this.checkForUpdates();

    // Verificar atualizações periodicamente (a cada 6 horas)
    this.scheduleUpdateChecks();

    // Lidar com erros do SW
    this.handleSwErrors();
  }

  /**
   * Registra SW apenas quando app estiver estável
   * Evita jank na inicialização
   */
  private registerWhenStable(): void {
    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true)
    );

    const everySixHours$ = interval(6 * 60 * 60 * 1000); // 6 horas
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => {
      this.swUpdate.checkForUpdate().then(() => {
        console.log('✅ Verificação de atualização concluída');
      });
    });
  }

  /**
   * Monitora quando há nova versão disponível
   */
  private checkForUpdates(): void {
    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY')
      )
      .subscribe((event) => {
        console.log('🆕 Nova versão disponível:', event);
        this.updateAvailable = true;

        // Disparar evento customizado para UI mostrar prompt
        const customEvent = new CustomEvent('pwa-update-available', {
          detail: {
            current: event.currentVersion,
            available: event.latestVersion,
          },
        });
        window.dispatchEvent(customEvent);
      });
  }

  /**
   * Agenda verificações periódicas de atualização
   */
  private scheduleUpdateChecks(): void {
    // Verificar a cada 6 horas
    interval(6 * 60 * 60 * 1000).subscribe(() => {
      this.swUpdate.checkForUpdate().then(() => {
        console.log('🔍 Verificação periódica de atualização');
      });
    });
  }

  /**
   * Lida com erros do Service Worker
   */
  private handleSwErrors(): void {
    this.swUpdate.unrecoverable.subscribe((event) => {
      console.error('❌ Erro irrecuperável no SW:', event.reason);

      // Notificar usuário
      const message =
        'A aplicação encontrou um erro. Será necessário recarregar.';

      if (confirm(`${message}\n\nRecarregar agora?`)) {
        window.location.reload();
      }
    });
  }

  /**
   * Verifica manualmente se há atualização
   */
  async checkForUpdate(): Promise<boolean> {
    if (!this.swUpdate.isEnabled) {
      return false;
    }

    try {
      const updateAvailable = await this.swUpdate.checkForUpdate();
      if (updateAvailable) {
        console.log('✅ Nova versão encontrada!');
      } else {
        console.log('ℹ️ Aplicação já está atualizada');
      }
      return updateAvailable;
    } catch (error) {
      console.error('❌ Erro ao verificar atualização:', error);
      return false;
    }
  }

  /**
   * Ativa a atualização (recarrega o app)
   */
  async activateUpdate(): Promise<void> {
    if (!this.swUpdate.isEnabled) {
      console.warn('⚠️ Service Worker não habilitado');
      return;
    }

    try {
      await this.swUpdate.activateUpdate();
      console.log('✅ Atualização ativada. Recarregando...');
      window.location.reload();
    } catch (error) {
      console.error('❌ Erro ao ativar atualização:', error);
    }
  }

  /**
   * Retorna se há atualização disponível
   */
  isUpdateAvailable(): boolean {
    return this.updateAvailable;
  }

  /**
   * Limpa todo cache e desregistra SW (apenas para debug)
   */
  async clearCacheAndReload(): Promise<void> {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      console.log('🗑️ Cache limpo');
    }

    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((reg) => reg.unregister()));
      console.log('🗑️ Service Worker desregistrado');
    }

    window.location.reload();
  }
}
