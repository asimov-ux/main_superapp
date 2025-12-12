import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandService, Brand } from '@superapp/ui-tokens';

@Component({
  selector: 'app-brand-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="brand-selector">
      <label for="brand-select">Tema:</label>
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
        gap: 8px;
      }

      label {
        font-size: 11px;
        color: var(--color-gray-90, #666);
      }

      select {
        padding: 4px 8px;
        border: 1px solid var(--color-gray-50, #d1d1d1);
        background: var(--color-white, #fff);
        color: var(--color-gray-130, #242424);
        font-family: 'Segoe UI', sans-serif;
        font-size: 12px;
        cursor: pointer;
      }

      select:hover {
        border-color: var(--color-primary-90, #005ca9);
      }

      select:focus {
        outline: none;
        border-color: var(--color-primary-90, #005ca9);
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
