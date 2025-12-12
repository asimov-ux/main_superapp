import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRANDS_DIR = path.join(__dirname, '../src/contracts/brands');
const DIST_DIR = path.join(__dirname, '../../../dist/ui-tokens/brands');

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

console.log('🎨 Gerando CSS dos tokens...\n');

const brandFiles = fs
  .readdirSync(BRANDS_DIR)
  .filter((f) => f.endsWith('.json'));

brandFiles.forEach((file) => {
  const brandPath = path.join(BRANDS_DIR, file);
  const tokens = JSON.parse(fs.readFileSync(brandPath, 'utf-8'));

  const brandId = tokens.brand?.id;
  if (!brandId) {
    console.error(`❌ ${file} sem brand.id`);
    return;
  }

  console.log(`📦 Processando: ${tokens.brand.name}`);

  const css = generateCSS(tokens);
  const outputPath = path.join(DIST_DIR, `brand-${brandId}.css`);

  fs.writeFileSync(outputPath, css, 'utf-8');
  console.log(`  ✅ Gerado: dist/ui-tokens/brands/brand-${brandId}.css\n`);
});

console.log('✅ Build concluído!\n');
console.log('📂 Próximo passo: Copiar para assets');
console.log(
  'Copy-Item "dist/ui-tokens/brands/*.css" "projects/people-superapp/src/assets/brands/" -Force\n'
);

function generateCSS(tokens) {
  const {
    brand,
    color,
    spacing,
    radius,
    shadow,
    font,
    fontSize,
    fontWeight,
    lineHeight,
    transition,
    gradient,
  } = tokens;

  let css = `/**\n * ${brand.name}\n * Version: ${
    brand.version
  }\n * Generated: ${new Date().toISOString()}\n */\n\n`;
  css += `:root[data-brand="${brand.id}"] {\n`;

  // CORES
  if (color) {
    css += processTokens(color, 'color');
  }

  // ESPAÇAMENTO
  if (spacing) {
    css += processTokens(spacing, 'spacing');
  }

  // RAIO/BORDER RADIUS
  if (radius) {
    css += processTokens(radius, 'radius');
  }

  // SOMBRAS
  if (shadow) {
    for (const [key, value] of Object.entries(shadow)) {
      if (value.$value) {
        const v = value.$value;
        const shadowValue =
          typeof v === 'object'
            ? `${v.offsetX} ${v.offsetY} ${v.blur} ${v.spread || '0px'} ${
                v.color
              }`
            : v;
        css += `  --shadow-${key}: ${shadowValue};\n`;
      }
    }
  }

  // FONTES
  if (font) {
    css += processTokens(font, 'font');
  }

  if (fontSize) {
    css += processTokens(fontSize, 'fontSize');
  }

  if (fontWeight) {
    css += processTokens(fontWeight, 'fontWeight');
  }

  if (lineHeight) {
    css += processTokens(lineHeight, 'lineHeight');
  }

  // TRANSIÇÕES
  if (transition) {
    css += processTokens(transition, 'transition');
  }

  // GRADIENTES
  if (gradient) {
    css += processTokens(gradient, 'gradient');
  }

  css += '}\n';
  return css;
}

function processTokens(obj, prefix) {
  let css = '';

  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object') {
      if (value.$value !== undefined) {
        css += `  --${prefix}-${key}: ${value.$value};\n`;
      } else {
        // Objeto aninhado (ex: color.text.primary)
        css += processTokens(value, `${prefix}-${key}`);
      }
    }
  }

  return css;
}
