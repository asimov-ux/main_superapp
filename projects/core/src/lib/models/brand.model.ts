/**
 * Brand Models
 */

export interface BrandMetadata {
  id: string;
  name: string;
  displayName: string;
  contractVersion: string;
  cssUrl: string;
  integrity: string;
  enabled: boolean;
  preload?: boolean;
  metadata?: {
    description?: string;
    author?: string;
    updatedAt?: string;
  };
}

export interface BrandRegistry {
  version: string;
  signature: string;
  timestamp: string;
  brands: BrandMetadata[];
}

export interface BrandLoadResult {
  success: boolean;
  brandId: string;
  error?: string;
}
