import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="welcome-page">
      <img
        src="assets/images/banner-portal-beneficios.jpg"
        alt="Portal de Benefícios"
        class="background-image"
      />
      <div class="content-overlay">
        <button class="btn-access-portal" (click)="acessarPortal()">
          Acessar o Portal
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
      }

      .welcome-page {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .background-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
      }

      .content-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding-left: 8%;
        padding-top: 38%;
      }

      .btn-access-portal {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 36px;
        background: #f37021;
        color: #fff;
        border: none;
        border-radius: 24px;
        font-family: 'Segoe UI', sans-serif;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 16px rgba(243, 112, 33, 0.4);
      }

      .btn-access-portal:hover {
        background: #e05a10;
        transform: translateY(-2px);
        box-shadow: 0 6px 24px rgba(243, 112, 33, 0.5);
      }

      /* Responsividade */
      @media (max-width: 768px) {
        .content-overlay {
          justify-content: center;
          padding-left: 20px;
          padding-right: 20px;
          padding-top: 50%;
        }

        .btn-access-portal {
          padding: 12px 28px;
          font-size: 14px;
        }
      }

      @media (max-width: 480px) {
        .content-overlay {
          padding-top: 60%;
        }

        .btn-access-portal {
          padding: 10px 24px;
          font-size: 13px;
        }
      }
    `,
  ],
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  acessarPortal(): void {
    this.router.navigate(['/home']);
  }
}
