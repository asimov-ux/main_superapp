import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  NavigationEnd,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandSelectorComponent } from './brand-selector/brand-selector.component';
import { AppUpdatePromptComponent } from './components/app-update-prompt.component';
import { AppUpdateService } from './services/app-update.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    BrandSelectorComponent,
    AppUpdatePromptComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Portal de Benefícios - CAIXA';
  sidebarPinned = false;
  isWelcomePage = false;

  constructor(private updateService: AppUpdateService, private router: Router) {
    // Detectar mudanças de rota
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isWelcomePage =
          event.urlAfterRedirects === '/' ||
          event.urlAfterRedirects.startsWith('/welcome');
      });
  }

  ngOnInit(): void {
    this.updateService.initialize();
    // Verificar rota inicial
    this.isWelcomePage =
      this.router.url === '/' || this.router.url.startsWith('/welcome');
    // Recuperar estado do menu do localStorage
    const savedPinState = localStorage.getItem('sidebarPinned');
    if (savedPinState) {
      this.sidebarPinned = savedPinState === 'true';
    }
  }

  toggleSidebarPin(): void {
    this.sidebarPinned = !this.sidebarPinned;
    localStorage.setItem('sidebarPinned', String(this.sidebarPinned));
  }

  getCurrentRoute(): string {
    const path = window.location.pathname;
    if (path.includes('people')) return 'Pessoas';
    if (path.includes('beneficios')) return 'Benefícios';
    if (path.includes('ausencias')) return 'Ausências';
    if (path.includes('dashboard')) return 'Dashboard';
    return 'Início';
  }
}
