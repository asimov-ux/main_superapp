# Design System CAIXA (DSC)

Sistema de design oficial da CAIXA Econômica Federal implementado em CSS puro com Custom Properties.

## 📁 Estrutura de Arquivos

```
design-system-caixa/
├── tokens/
│   ├── tokens-colors.css          # Paletas de cores (Fixa, Flexível, Feedback)
│   ├── tokens-spacing.css         # Espaçamentos (4px até 160px)
│   ├── tokens-typography.css      # Tipografia (CAIXA Std)
│   └── tokens-borders-shadows.css # Bordas e sombras
├── components/
│   ├── grid-system.css            # Grid 12 colunas responsivo
│   ├── components-buttons.css     # Botões (primary, secondary, tertiary)
│   ├── components-forms.css       # Formulários (input, select, textarea)
│   └── components-feedback.css    # Feedback (alert, badge, spinner)
├── utilities/
│   └── utilities.css              # Classes utilitárias
├── index.css                      # Ponto de entrada principal
└── design-system-caixa.json       # Documentação JSON
```

## 🚀 Como Usar

### Importação Global

No arquivo `styles.scss` do seu projeto Angular:

```scss
@import '../../../dsc-components/src/design-system-caixa/index.css';
```

### Usando Tokens CSS

```css
.meu-componente {
  /* Cores */
  background-color: var(--color-primary-90);
  color: var(--color-white);

  /* Espaçamentos */
  padding: var(--spacing-small);
  margin-bottom: var(--spacing-medium);

  /* Tipografia */
  font-family: var(--font-family-caixa);
  font-size: var(--font-size-micro);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-distant);

  /* Bordas */
  border-radius: var(--border-radius-nano);
  border: var(--border-width-thin) solid var(--color-gray-50);

  /* Sombras */
  box-shadow: var(--shadow-elevation-2);
}
```

### Classes Utilitárias

```html
<!-- Botões -->
<button class="dsc-button dsc-button-primary">Primário</button>
<button class="dsc-button dsc-button-secondary">Secundário</button>
<button class="dsc-button dsc-button-tertiary">Terciário</button>

<!-- Formulários -->
<div class="dsc-form-group">
  <label class="dsc-label">Nome</label>
  <input type="text" class="dsc-input" placeholder="Digite seu nome" />
</div>

<!-- Feedback -->
<div class="dsc-alert dsc-alert-positive">Operação realizada com sucesso!</div>

<!-- Grid -->
<div class="dsc-container">
  <div class="dsc-grid">
    <div class="dsc-col-6">Coluna 1</div>
    <div class="dsc-col-6">Coluna 2</div>
  </div>
</div>

<!-- Utilitários -->
<div class="dsc-d-flex dsc-justify-between dsc-align-center">
  <span class="text-primary-90">Texto azul</span>
  <span class="bg-secondary-70 p-small rounded-nano">Badge laranja</span>
</div>
```

## 🎨 Tokens Principais

### Cores Fixas (Identidade CAIXA)

- **Primary (Azul CAIXA)**: `--color-primary-90` (#005CA9)
- **Secondary (Laranja CAIXA)**: `--color-secondary-70` (#F39200)
- **Tertiary (Turquesa)**: `--color-tertiary-70` (#54BBAB)
- **Grayscale**: `--color-gray-50` (#D0E0E3)

### Espaçamentos

- `--spacing-quark`: 4px
- `--spacing-nano`: 8px
- `--spacing-micro`: 12px
- `--spacing-tiny`: 16px (base)
- `--spacing-small`: 32px
- `--spacing-medium`: 40px
- `--spacing-large`: 48px

### Tipografia

- **Font Family**: CAIXA Std, Arial, sans-serif
- **Tamanhos**: 12px a 60px (escala 1.125)
- **Pesos**: 400 (Regular), 600 (Semibold), 700 (Bold)
- **Line Heights**: 100%, 120%, 140%, 150%, 170%

## 📱 Breakpoints Responsivos

- **xs**: < 576px (4 colunas)
- **sm**: 576px - 767px (4 colunas)
- **md**: 768px - 991px (6 colunas)
- **lg**: 992px - 1199px (6 colunas)
- **xl**: ≥ 1200px (12 colunas)

## ✅ Acessibilidade

- Contraste WCAG AA/AAA
- Tamanho mínimo de fonte: 16px
- Área de toque mínima: 44x44px
- Suporte a leitores de tela
- Prefixos CSS para compatibilidade

## 🔄 Migração de Código Antigo

Se você estava usando tokens antigos, faça as seguintes substituições:

| Antigo          | Novo                      |
| --------------- | ------------------------- |
| `--fontSize-md` | `var(--font-size-micro)`  |
| `--spacing-xl`  | `var(--spacing-large)`    |
| `--color-brand` | `var(--color-primary-90)` |
| `size="sm"`     | `size="small"`            |

## 📚 Documentação Completa

Consulte o arquivo `design-system-caixa.json` para a documentação completa de todos os tokens e componentes disponíveis.

## 🛠️ Desenvolvimento

Todos os componentes CSS foram implementados seguindo:

- Design oficial da CAIXA (Doc3.pdf - 62 páginas)
- Material Design 3 para sombras
- Princípios de design atômico
- Mobile-first e responsivo

---

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024
