import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTRACT_PATH = path.join(
  __dirname,
  '../src/contracts/dtcg-contract.json'
);
const BRANDS_DIR = path.join(__dirname, '../src/contracts/brands');
const WHITELIST_PATH = path.join(__dirname, '../src/contracts/whitelist.json');

// Carregar contrato base
const contract = JSON.parse(fs.readFileSync(CONTRACT_PATH, 'utf8'));

// Carregar whitelist
const whitelist = JSON.parse(fs.readFileSync(WHITELIST_PATH, 'utf8'));

console.log('🔍 Validando contratos de design tokens...\n');

let hasErrors = false;

// Validar cada marca
const brandFiles = fs
  .readdirSync(BRANDS_DIR)
  .filter((f) => f.endsWith('.json'));

brandFiles.forEach((file) => {
  const brandPath = path.join(BRANDS_DIR, file);
  const brand = JSON.parse(fs.readFileSync(brandPath, 'utf8'));

  console.log(`📋 Validando: ${brand.brand?.name || file}`);

  // Verificar se está na whitelist
  const inWhitelist = whitelist.allowedBrands.some(
    (b) => b.id === brand.brand?.id
  );

  if (!inWhitelist) {
    console.error(`  ❌ Marca "${brand.brand?.id}" não está na whitelist!`);
    hasErrors = true;
  } else {
    console.log(`  ✅ Marca autorizada na whitelist`);
  }

  // Validar tokens obrigatórios
  const requiredTokens = ['color.brand', 'color.text.primary', 'color.bg.base'];

  requiredTokens.forEach((token) => {
    const parts = token.split('.');
    let obj = brand;

    for (const part of parts) {
      if (!obj || !obj[part]) {
        console.error(`  ❌ Token obrigatório ausente: ${token}`);
        hasErrors = true;
        return;
      }
      obj = obj[part];
    }
  });

  console.log('');
});

if (hasErrors) {
  console.error('❌ Validação falhou! Corrija os erros acima.\n');
  process.exit(1);
} else {
  console.log('✅ Todos os contratos são válidos!\n');
  process.exit(0);
}
