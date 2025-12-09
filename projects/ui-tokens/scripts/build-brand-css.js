import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRANDS_DIR = path.join(__dirname, '../src/contracts/brands');
const DIST_DIR = path.join(__dirname, '../../../dist/ui-tokens/brands');

// Criar pasta dist se não existir
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

console.log('🎨 Gerando arquivos CSS a partir dos tokens...\n');

// Ler todos os arquivos JSON de marcas
const brandFiles = fs
  .readdirSync(BRANDS_DIR)
  .filter((file) => file.endsWith('.json'));

let generatedCount = 0;

brandFiles.forEach((file) => {
  const brandPath = path.join(BRANDS_DIR, file);
  const brandData = JSON.parse(fs.readFileSync(brandPath, 'utf-8'));

  const brandId = brandData.brand?.id;
  const brandName = brandData.brand?.name || brandId;

  if (!brandId) {
    console.error(`⚠️ Arquivo ${file} não possui brand.id`);
    return;
  }

  console.log(`📦 Processando: ${brandName}`);

  // Gerar CSS
  const css = generateCss(brandData);

  // Salvar arquivo
  const outputFile = path.join(DIST_DIR, `brand-${brandId}.css`);
  fs.writeFileSync(outputFile, css, 'utf-8');

  console.log(`  ✅ Gerado: dist/ui-tokens/brands/brand-${brandId}.css`);
  generatedCount++;
});

console.log(`\n✅ ${generatedCount} arquivos CSS gerados com sucesso!`);
console.log(`\n📂 Localização: ${DIST_DIR}`);
console.log('\n🎯 Próximo passo: Copiar para assets do Angular\n');
console.log(
  'Copy-Item "dist/ui-tokens/brands/*.css" "projects/people-superapp/src/assets/brands/" -Force'
);

/**
 * Gera CSS a partir dos tokens
 */
function generateCss(tokens) {
  const brandName = tokens.brand?.name || 'Unknown Brand';
  const version = tokens.brand?.version || '1.0.0';
  const timestamp = new Date().toISOString();

  let css = `/**\n * ${brandName}\n * Version: ${version}\n * Generated: ${timestamp}\n */\n\n:root {\n`;

  // Processar cores
  if (tokens.color) {
    css += processColorTokens(tokens.color, 'color');
  }

  // Processar espaçamentos
  if (tokens.spacing) {
    css += processSimpleTokens(tokens.spacing, 'spacing');
  }

  // Processar border radius
  if (tokens.radius) {
    css += processSimpleTokens(tokens.radius, 'radius');
  }

  // Processar sombras
  if (tokens.shadow) {
    css += processShadowTokens(tokens.shadow);
  }

  // Processar fontes
  if (tokens.font) {
    css += processSimpleTokens(tokens.font, 'font');
  }

  // Processar tamanhos de fonte
  if (tokens.fontSize) {
    css += processSimpleTokens(tokens.fontSize, 'fontSize');
  }

  // Processar pesos de fonte
  if (tokens.fontWeight) {
    css += processSimpleTokens(tokens.fontWeight, 'fontWeight');
  }

  // Processar line-height
  if (tokens.lineHeight) {
    css += processSimpleTokens(tokens.lineHeight, 'lineHeight');
  }

  // Processar transições
  if (tokens.transition) {
    css += processSimpleTokens(tokens.transition, 'transition');
  }

  // Processar gradientes
  if (tokens.gradient) {
    css += processSimpleTokens(tokens.gradient, 'gradient');
  }

  css += '}\n';

  return css;
}

/**
 * Processa tokens de cor (recursivo para objetos aninhados)
 */
function processColorTokens(colorObj, prefix) {
  let css = '';

  for (const [key, value] of Object.entries(colorObj)) {
    if (value && typeof value === 'object') {
      if (value.$value !== undefined) {
        // Token final
        const varName = `--${prefix}-${key}`;
        css += `  ${varName}: ${value.$value};\n`;
      } else {
        // Objeto aninhado (ex: text.primary)
        css += processColorTokens(value, `${prefix}-${key}`);
      }
    }
  }

  return css;
}

/**
 * Processa tokens simples (sem aninhamento)
 */
function processSimpleTokens(obj, prefix) {
  let css = '';

  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && value.$value !== undefined) {
      const varName = `--${prefix}-${key}`;
      css += `  ${varName}: ${value.$value};\n`;
    }
  }

  return css;
}

/**
 * Processa tokens de sombra (formato especial)
 */
function processShadowTokens(shadowObj) {
  let css = '';

  for (const [key, value] of Object.entries(shadowObj)) {
    if (value && typeof value === 'object' && value.$value) {
      const shadow = value.$value;
      const varName = `--shadow-${key}`;

      if (typeof shadow === 'object') {
        // Formato: { offsetX, offsetY, blur, spread, color }
        const shadowValue = `${shadow.offsetX} ${shadow.offsetY} ${
          shadow.blur
        } ${shadow.spread || '0px'} ${shadow.color}`;
        css += `  ${varName}: ${shadowValue};\n`;
      } else {
        // Formato string direto
        css += `  ${varName}: ${shadow};\n`;
      }
    }
  }

  return css;
}
