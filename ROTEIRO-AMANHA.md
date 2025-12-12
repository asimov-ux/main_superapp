# 🗓️ ROTEIRO DE TRABALHO - DIA 11/12/2025

## ✅ PROGRESSO HOJE (10/12/2025)

### Decisão Arquitetural: OPÇÃO A ✅

**Migrar Design System CAIXA → ui-tokens (estrutura white-label)**

**Justificativa:**

- Mantém BrandService funcional (whitelist + runtime)
- Separa responsabilidades (tokens vs widgets vs features)
- Escalável (múltiplos brands via JSON)
- ROI alto (investimento já feito)

### Trabalho Completado ✅

#### 1. Sistema de Tokens (100%)

- ✅ Atualizado `caixa-design-tokens.json` com cores oficiais CAIXA
  - Primary: #005CA9 (Azul CAIXA 90)
  - Secondary: #F39200 (Laranja CAIXA 70)
  - Tertiary: #54BBAB (Turquesa CAIXA)
- ✅ Adicionados tokens de estado (hover, active, disabled)
- ✅ Adicionados tokens elevation (Material Design 3, 5 níveis)
- ✅ Adicionados tokens motion (duration, easing)
- ✅ Expandido `contract.schema.json` v2.0.0
  - Schema completo com definitions (colorToken, dimensionToken, etc.)
  - Validação SemVer para brand.version
  - Suporte completo typography, spacing, borderRadius, shadow

#### 2. Refatoração de Widgets

- ✅ **Button** - Refatorado 100% tokens (era 23 hardcodes)
  - Todas as cores → var(--color-\*)
  - Spacing → var(--spacing-\*)
  - Motion → var(--motion-duration-base)
  - Fontes → var(--font-family-base)
- ✅ **Input** - Já estava usando tokens corretamente
- ✅ **Card** - Já estava usando tokens corretamente

---

## 🎯 PLANO PARA AMANHÃ (11/12/2025)

### MANHÃ - FASE 1: Build & Validação (2-3h)

#### 1.1 Build do Sistema de Tokens (30min)

```bash
# Executar script de build dos tokens
npm run build:tokens
# ou
node tools/build-tokens.js
```

**Validações:**

- [ ] CSS gerado para CAIXA brand
- [ ] Variáveis CSS corretas (--color-primary: #005CA9)
- [ ] Schema validation passou (check-contract.js)

#### 1.2 Build das Libs (30min)

```bash
ng build ui-tokens
ng build ui-widgets
ng build core
```

**Validações:**

- [ ] Sem erros TypeScript
- [ ] Sem warnings de compilação
- [ ] Dist folders gerados

#### 1.3 Testar no Storybook (1h)

```bash
npm run storybook
```

**Testar:**

- [ ] Button com todas as variantes (primary, secondary, danger, outlined, text, auxiliary)
- [ ] Button hover/active/disabled funcionando
- [ ] Input com validação
- [ ] Card interativo
- [ ] Cores CAIXA aplicadas corretamente

#### 1.4 Verificar Hardcodes Restantes (30min)

```bash
# Criar script de detecção
grep -r "#[0-9A-Fa-f]\{6\}" projects/ui-widgets/src --exclude="*.spec.ts"
```

**Verificar arquivos:**

- [ ] Modal component
- [ ] Toast component
- [ ] List component
- [ ] Toolbar component

---

### TARDE - FASE 2: Widgets Faltantes (3-4h)

#### 2.1 Verificar Estado dos Widgets (30min)

Verificar se Modal, Toast, List já existem:

```bash
# Listar todos os widgets
ls projects/ui-widgets/src/lib/
```

**Checklist:**

- [ ] Card ✅ (existe)
- [ ] Button ✅ (existe)
- [ ] Input ✅ (existe)
- [ ] Modal (verificar implementação)
- [ ] Toast (verificar implementação)
- [ ] List (verificar implementação)
- [ ] Toolbar (verificar implementação)

#### 2.2 Completar/Criar Widgets Faltantes (2h)

**Se Modal existe:**

- [ ] Verificar hardcodes
- [ ] Refatorar para tokens puros
- [ ] Adicionar overlay com backdrop-blur
- [ ] Testar acessibilidade (ESC, focus trap)

**Se Toast existe:**

- [ ] Verificar hardcodes
- [ ] Refatorar para tokens puros
- [ ] Testar ToastService

**Se List/Table existe:**

- [ ] Verificar hardcodes
- [ ] Refatorar para tokens puros

**Se faltarem widgets:**

- [ ] Criar componentes faltantes (seguir template do Card)
- [ ] Implementar 100% com tokens
- [ ] Adicionar acessibilidade (ARIA)

#### 2.3 Criar Stories Completas (1h)

**Stories a criar:**

- [ ] `design-tokens.stories.ts` - Showcase de cores, spacing, typography
- [ ] `button.stories.ts` - Todas as variantes + interações
- [ ] `card.stories.ts` - Variações (elevated, interactive)
- [ ] `modal.stories.ts` - Exemplos de uso
- [ ] `toast.stories.ts` - Tipos (success, error, warning, info)
- [ ] `input.stories.ts` - Estados (normal, error, disabled)

---

### NOITE - FASE 3: PWA & Qualidade (2h)

#### 3.1 Configurar PWA Básico (1h)

```bash
ng add @angular/pwa --project=people-superapp
```

**Configurar:**

- [ ] `ngsw-config.json` - Estratégias de cache
- [ ] `manifest.webmanifest` - Atualizar com dados CAIXA
- [ ] Service Worker registration
- [ ] Testar offline mode

#### 3.2 Setup Stylelint (1h)

**Instalar:**

```bash
npm install -D stylelint stylelint-config-standard
```

**Criar `.stylelintrc.json`:**

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "color-no-hex": true,
    "declaration-property-value-disallowed-list": {
      "/^(margin|padding)/": ["/^[0-9]/"],
      "/^(width|height)/": ["/^[0-9]/"]
    },
    "function-disallowed-list": ["rgb", "rgba"]
  }
}
```

**Adicionar script:**

```json
{
  "scripts": {
    "lint:css": "stylelint \"projects/**/*.{css,scss}\"",
    "lint:css:fix": "stylelint \"projects/**/*.{css,scss}\" --fix"
  }
}
```

**Testar:**

```bash
npm run lint:css
```

---

## 📊 MÉTRICAS - PROGRESSO

| Métrica               | Atual (10/12) | Meta (11/12) | Meta Final |
| --------------------- | ------------- | ------------ | ---------- |
| **Widgets MVP**       | 3/6 (50%)     | 6/6 (100%)   | 6/6        |
| **Tokens Coverage**   | 95%           | 100%         | 100%       |
| **Hardcodes**         | ~5            | 0            | 0          |
| **PWA Score**         | 0             | 70+          | 90+        |
| **A11y Score**        | ~50           | 75+          | 90+        |
| **Storybook Stories** | 5             | 12+          | 15+        |

---

## 🔧 COMANDOS RÁPIDOS

### Build Completo

```bash
# 1. Build tokens
npm run build:tokens

# 2. Build libs
ng build ui-tokens && ng build ui-widgets && ng build core

# 3. Build app
ng build people-superapp

# 4. Testar Storybook
npm run storybook
```

### Lint & Validação

```bash
# TypeScript
ng lint

# CSS (após configurar Stylelint)
npm run lint:css

# Validar schema de tokens
node projects/ui-tokens/scripts/check-contract.js
```

### PWA Test

```bash
# Build production
ng build people-superapp --configuration=production

# Servir com service worker
npx http-server dist/people-superapp -p 8080

# Testar no browser: http://localhost:8080
# DevTools > Application > Service Workers
```

---

## ⚠️ PONTOS DE ATENÇÃO

### 1. Build de Tokens

O script `build-brand-css.js` pode precisar de ajustes para:

- Ler novo formato de tokens ($type, $value, $description)
- Gerar CSS variables corretamente
- Mapear shadow objects para CSS box-shadow

### 2. BrandService

Verificar se o serviço está carregando o novo caixa-design-tokens.json:

- Path correto em `brands.json`
- Whitelist atualizada
- Runtime switching funcionando

### 3. Storybook

Garantir que o Storybook importa os tokens CSS:

- `.storybook/preview.ts` deve importar brand CSS
- Stories devem mostrar theme switching

### 4. TypeScript Paths

Verificar se os paths estão corretos após builds:

```json
{
  "paths": {
    "@superapp/ui-tokens": ["./dist/ui-tokens"],
    "@superapp/ui-widgets": ["./dist/ui-widgets"],
    "@superapp/core": ["./dist/core"]
  }
}
```

---

## 🎯 PRIORIDADES

### MUST HAVE (Amanhã)

1. ✅ Build de tokens funcionando
2. ✅ Todos os widgets sem hardcodes
3. ✅ 6/6 widgets MVP implementados
4. ✅ Storybook documentado

### SHOULD HAVE (Amanhã)

5. ✅ PWA configurado
6. ✅ Stylelint instalado

### NICE TO HAVE (Se der tempo)

7. ⚠️ Migrar dsc-components → ui-widgets
8. ⚠️ Criar brand acme-dark.json
9. ⚠️ Testes unitários dos widgets

---

## 📝 NOTAS TÉCNICAS

### Estrutura de Arquivos Atual

```
projects/
├── ui-tokens/
│   ├── brands/
│   │   ├── caixa-design-tokens.json ✅ (atualizado)
│   │   └── acme.json
│   ├── schema/
│   │   └── contract.schema.json ✅ (v2.0.0)
│   └── scripts/
│       ├── build-brand-css.js
│       └── check-contract.js
├── ui-widgets/
│   └── src/lib/
│       ├── button/ ✅ (refatorado)
│       ├── input/ ✅ (já usa tokens)
│       ├── card/ ✅ (já usa tokens)
│       ├── modal/ ⚠️ (verificar)
│       ├── toast/ ⚠️ (verificar)
│       ├── list/ ⚠️ (verificar)
│       └── toolbar/ ⚠️ (verificar)
└── dsc-components/ ⚠️ (migrar futuramente)
```

### Tokens Disponíveis

**Cores:**

- `--color-primary` (#005CA9)
- `--color-secondary` (#F39200)
- `--color-tertiary` (#54BBAB)
- `--color-hover-primary`, `--color-active-primary`
- `--color-disabled-background`, `--color-disabled-text`
- `--color-success`, `--color-danger`, `--color-warning`, `--color-info`

**Spacing:**

- `--spacing-xs` (4px)
- `--spacing-sm` (8px)
- `--spacing-md` (16px)
- `--spacing-lg` (24px)
- `--spacing-xl` (32px)
- `--spacing-2xl` (48px)

**Typography:**

- `--font-family-base`
- `--font-size-xs`, `--font-size-sm`, `--font-size-md`, etc.
- `--font-weight-light`, `--font-weight-regular`, etc.

**Shadows:**

- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`
- `--elevation-level1` até `--elevation-level5`

**Motion:**

- `--motion-duration-fast` (150ms)
- `--motion-duration-base` (250ms)
- `--motion-duration-slow` (400ms)
- `--motion-easing-standard`, `--motion-easing-enter`, `--motion-easing-exit`

---

## 🚀 RESULTADO ESPERADO NO FINAL DO DIA

**Entregas Completas:**

- ✅ 6/6 widgets MVP implementados e testados
- ✅ 0 hardcodes em todo o projeto
- ✅ PWA Score 70+
- ✅ Storybook com 12+ stories documentadas
- ✅ Stylelint configurado e passando
- ✅ Build pipeline funcionando

**Estado do Projeto:**

- 🟢 Pronto para desenvolver features de negócio
- 🟢 White-label funcionando (trocar brand via BrandService)
- 🟢 Design System CAIXA oficial implementado
- 🟢 Qualidade garantida (lint, schema validation)

---

**Total estimado: 7-9 horas de trabalho**

**Primeira tarefa ao acordar:**

```bash
npm run build:tokens
```

Se der erro, ajustar `build-brand-css.js` para ler novo formato de tokens.

---

**Última atualização:** 10/12/2025 - 23:45
**Próxima revisão:** 11/12/2025 - 09:00
