import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Brand {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
  requiresSignature: boolean;
}

export interface BrandConfig {
  allowedBrands: Brand[];
  defaultBrand: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private readonly STORAGE_KEY = 'app-current-brand';
  private readonly CSS_LINK_ID = 'dynamic-brand-css';

  private currentBrand$ = new BehaviorSubject<string>('acme-light');
  private availableBrands$ = new BehaviorSubject<Brand[]>([]);

  // Whitelist padrão (pode ser sobrescrita via HTTP)
  private whitelist: BrandConfig = {
    allowedBrands: [
      {
        id: 'cef-light',
        name: 'Caixa Economica Federal',
        version: '1.0.0',
        enabled: true,
        requiresSignature: false,
      },
      {
        id: 'acme-light',
        name: 'ACME light',
        version: '1.0.0',
        enabled: true,
        requiresSignature: false,
      },
      {
        id: 'acme-dark',
        name: 'ACME Dark',
        version: '1.0.0',
        enabled: true,
        requiresSignature: false,
      },
    ],
    defaultBrand: 'caixa-light',
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initialize();
  }

  /**
   * Inicializa o serviço
   */
  private initialize(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Carregar marcas disponíveis
    this.availableBrands$.next(
      this.whitelist.allowedBrands.filter((b) => b.enabled)
    );

    // Tentar carregar marca salva no localStorage
    const saved = this.loadFromStorage();
    const brandId = saved || this.whitelist.defaultBrand;

    // Aplicar marca inicial
    this.switchBrand(brandId);
  }

  /**
   * Troca a marca atual
   */
  switchBrand(brandId: string): boolean {
    console.log(`🎨 Tentando trocar para marca: ${brandId}`);

    // Validar se marca existe na whitelist
    const brand = this.whitelist.allowedBrands.find((b) => b.id === brandId);

    if (!brand) {
      console.error(`❌ Marca "${brandId}" não encontrada na whitelist!`);
      return false;
    }

    if (!brand.enabled) {
      console.error(`❌ Marca "${brandId}" está desabilitada!`);
      return false;
    }

    // TODO: Verificar assinatura se necessário
    if (brand.requiresSignature) {
      console.warn(
        `⚠️ Marca "${brandId}" requer validação de assinatura (não implementado)`
      );
    }

    // Aplicar CSS dinamicamente
    this.loadBrandCss(brandId);

    // Atualizar estado
    this.currentBrand$.next(brandId);

    // Salvar no localStorage
    this.saveToStorage(brandId);

    console.log(`✅ Marca "${brand.name}" aplicada com sucesso!`);
    return true;
  }

  /**
   * Carrega o arquivo CSS da marca
   */
  private loadBrandCss(brandId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const document = window.document;

    // Remover link anterior (se existir)
    const oldLink = document.getElementById(this.CSS_LINK_ID);
    if (oldLink) {
      oldLink.remove();
    }

    // Criar novo link
    const link = document.createElement('link');
    link.id = this.CSS_LINK_ID;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `assets/brands/brand-${brandId}.css`;

    // Adicionar ao head
    document.head.appendChild(link);

    console.log(`📦 CSS carregado: ${link.href}`);
  }

  /**
   * Retorna a marca atual como Observable
   */
  getCurrentBrand(): Observable<string> {
    return this.currentBrand$.asObservable();
  }

  /**
   * Retorna a marca atual (valor sincrono)
   */
  getCurrentBrandId(): string {
    return this.currentBrand$.value;
  }

  /**
   * Retorna marcas disponíveis
   */
  getAvailableBrands(): Observable<Brand[]> {
    return this.availableBrands$.asObservable();
  }

  /**
   * Retorna marcas disponíveis (valor sincrono)
   */
  getAvailableBrandsSync(): Brand[] {
    return this.availableBrands$.value;
  }

  /**
   * Atualiza a whitelist (útil para carregar de um backend)
   */
  updateWhitelist(config: BrandConfig): void {
    console.log('📋 Atualizando whitelist de marcas...');
    this.whitelist = config;
    this.availableBrands$.next(config.allowedBrands.filter((b) => b.enabled));
  }

  /**
   * Salva marca no localStorage
   */
  private saveToStorage(brandId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, brandId);
    } catch (error) {
      console.warn('⚠️ Não foi possível salvar marca no localStorage:', error);
    }
  }

  /**
   * Carrega marca do localStorage
   */
  private loadFromStorage(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn(
        '⚠️ Não foi possível carregar marca do localStorage:',
        error
      );
      return null;
    }
  }

  /**
   * Reseta para marca padrão
   */
  resetToDefault(): void {
    console.log('🔄 Resetando para marca padrão...');
    this.switchBrand(this.whitelist.defaultBrand);
  }

  /**
   * Verifica se marca é válida
   */
  isValidBrand(brandId: string): boolean {
    return this.whitelist.allowedBrands.some(
      (b) => b.id === brandId && b.enabled
    );
  }
}
