import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import {
  BrandMetadata,
  BrandRegistry,
  BrandLoadResult,
} from '../models/brand.model';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private readonly STORAGE_KEY = 'superapp:selected-brand';
  private readonly BRAND_REGISTRY_URL = '/assets/brands.json';
  private readonly SUPPORTED_CONTRACT_VERSION = '1.1.0';

  private currentBrand$ = new BehaviorSubject<string>('default');
  private brandRegistry: BrandRegistry | null = null;
  private loadedCssLinks = new Map<string, HTMLLinkElement>();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async initialize(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      await this.loadBrandRegistry();
      const brandFromUrl = this.getBrandFromQueryParam();

      if (brandFromUrl) {
        await this.setBrand(brandFromUrl);
        return;
      }

      const savedBrand = this.getSavedBrand();
      if (savedBrand) {
        await this.setBrand(savedBrand);
        return;
      }

      await this.setBrand('default');
    } catch (error) {
      console.error('Failed to initialize brand service:', error);
      this.applyBrandToRoot('default');
    }
  }

  private async loadBrandRegistry(): Promise<void> {
    try {
      this.brandRegistry = await firstValueFrom(
        this.http.get<BrandRegistry>(this.BRAND_REGISTRY_URL)
      );

      if (!this.brandRegistry?.signature) {
        console.warn('Brand registry is not signed');
      }

      console.log(
        `Brand registry loaded: v${this.brandRegistry?.version ?? 'unknown'}`
      );
    } catch (error) {
      throw new Error(`Failed to load brand registry: ${error}`);
    }
  }

  async setBrand(brandId: string): Promise<BrandLoadResult> {
    if (!isPlatformBrowser(this.platformId)) {
      return { success: false, brandId, error: 'Not in browser' };
    }

    const brand = this.getBrandMetadata(brandId);

    if (!brand) {
      console.error(`Brand not found: ${brandId}`);
      return { success: false, brandId, error: 'Brand not found' };
    }

    if (!brand.enabled) {
      console.error(`Brand is disabled: ${brandId}`);
      return { success: false, brandId, error: 'Brand is disabled' };
    }

    if (!this.isContractVersionCompatible(brand.contractVersion)) {
      console.error(`Incompatible contract version: ${brand.contractVersion}`);
      return {
        success: false,
        brandId,
        error: `Contract version mismatch: ${brand.contractVersion}`,
      };
    }

    try {
      await this.injectBrandCss(brand);
      this.applyBrandToRoot(brandId);
      this.saveBrand(brandId);
      this.currentBrand$.next(brandId);

      console.log(`Brand applied: ${brandId}`);
      return { success: true, brandId };
    } catch (error) {
      console.error(`Failed to apply brand ${brandId}:`, error);
      return {
        success: false,
        brandId,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async injectBrandCss(brand: BrandMetadata): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)) {
        resolve();
        return;
      }

      if (this.loadedCssLinks.has(brand.id)) {
        resolve();
        return;
      }

      this.removeOldCssLinks(brand.id);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = brand.cssUrl;
      link.crossOrigin = 'anonymous';

      if (brand.integrity) {
        link.integrity = brand.integrity;
      }

      link.setAttribute('data-brand', brand.id);

      if (brand.preload === false) {
        link.media = 'print';
      }

      link.onload = () => {
        if (link.media === 'print') {
          link.media = 'all';
        }

        this.loadedCssLinks.set(brand.id, link);
        console.log(`CSS loaded successfully: ${brand.id}`);
        resolve();
      };

      link.onerror = () => {
        document.head.removeChild(link);
        reject(new Error(`Failed to load CSS for brand: ${brand.id}`));
      };

      document.head.appendChild(link);

      if (brand.preload !== false) {
        link.media = 'all';
      }
    });
  }

  private removeOldCssLinks(currentBrandId: string): void {
    this.loadedCssLinks.forEach((link, brandId) => {
      if (brandId !== 'default' && brandId !== currentBrandId) {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
        this.loadedCssLinks.delete(brandId);
        console.log(`Removed CSS for brand: ${brandId}`);
      }
    });
  }

  private applyBrandToRoot(brandId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const root = document.documentElement;
    root.setAttribute('data-brand', brandId);
    console.log(`Applied data-brand="${brandId}" to root element`);
  }

  private getBrandFromQueryParam(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const params = new URLSearchParams(window.location.search);
    const brand = params.get('brand');

    if (brand) {
      console.log(`Brand from query param: ${brand}`);
    }

    return brand;
  }

  private saveBrand(brandId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, brandId);
    } catch (error) {
      console.warn('Failed to save brand to localStorage:', error);
    }
  }

  private getSavedBrand(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to read brand from localStorage:', error);
      return null;
    }
  }

  private getBrandMetadata(brandId: string): BrandMetadata | undefined {
    return this.brandRegistry?.brands.find((b) => b.id === brandId);
  }

  private isContractVersionCompatible(brandVersion: string): boolean {
    const [brandMajor, brandMinor] = brandVersion.split('.').map(Number);
    const [supportedMajor, supportedMinor] =
      this.SUPPORTED_CONTRACT_VERSION.split('.').map(Number);

    if (brandMajor !== supportedMajor) {
      return false;
    }

    return brandMinor <= supportedMinor;
  }

  getCurrentBrand$(): Observable<string> {
    return this.currentBrand$.asObservable();
  }

  getCurrentBrand(): string {
    return this.currentBrand$.value;
  }

  getAvailableBrands(): BrandMetadata[] {
    return this.brandRegistry?.brands.filter((b) => b.enabled) || [];
  }

  getRegistryInfo(): { version: string; timestamp: string } | null {
    if (!this.brandRegistry) {
      return null;
    }

    return {
      version: this.brandRegistry.version,
      timestamp: this.brandRegistry.timestamp,
    };
  }

  async preloadBrand(brandId: string): Promise<void> {
    const brand = this.getBrandMetadata(brandId);

    if (!brand) {
      console.warn(`Cannot preload unknown brand: ${brandId}`);
      return;
    }

    if (this.loadedCssLinks.has(brandId)) {
      console.log(`Brand CSS already loaded: ${brandId}`);
      return;
    }

    try {
      await this.injectBrandCss(brand);
      console.log(`Preloaded brand: ${brandId}`);
    } catch (error) {
      console.error(`Failed to preload brand ${brandId}:`, error);
    }
  }
}
