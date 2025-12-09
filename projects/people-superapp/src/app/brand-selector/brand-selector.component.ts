import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandService, Brand } from '@superapp/ui-tokens';

@Component({
  selector: 'app-brand-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="brand-selector">
      <label for="brand-select">🎨 Escolher Tema:</label>
      <select
        id="brand-select"
        [value]="currentBrand"
        (change)="onBrandChange($event)"
      >
        <option *ngFor="let brand of availableBrands" [value]="brand.id">
          {{ brand.name }}
        </option>
      </select>
    </div>
  `,
  styles: [
    `
      .brand-selector {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: var(--color-bg-surface);
        border-bottom: 1px solid var(--color-border);
      }

      label {
        font-weight: 600;
        color: var(--color-text-primary);
        font-size: 14px;
      }

      select {
        padding: 8px 12px;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-bg-base);
        color: var(--color-text-primary);
        font-size: 14px;
        cursor: pointer;
        transition: all var(--transition-fast);
      }

      select:hover {
        border-color: var(--color-brand);
      }

      select:focus {
        outline: none;
        border-color: var(--color-brand);
        box-shadow: 0 0 0 3px rgba(0, 85, 255, 0.1);
      }
    `,
  ],
})
export class BrandSelectorComponent implements OnInit {
  currentBrand: string = 'acme-light';
  availableBrands: Brand[] = [];

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    // Carregar marca atual
    this.brandService.getCurrentBrand().subscribe((brandId) => {
      this.currentBrand = brandId;
    });

    // Carregar marcas disponíveis
    this.availableBrands = this.brandService.getAvailableBrandsSync();
  }

  onBrandChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const brandId = select.value;

    console.log(`🎨 Trocando para: ${brandId}`);

    const success = this.brandService.switchBrand(brandId);

    if (!success) {
      alert('Erro ao trocar marca!');
      // Reverter select
      select.value = this.currentBrand;
    }
  }
}
