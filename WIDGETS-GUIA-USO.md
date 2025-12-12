# 📦 UI Widgets Library — Guia Completo de Uso

> **7 componentes prontos** | 100% tokenizados com cores da Caixa | Micro Front-End ready

## 📍 Localização dos Arquivos

```
projects/ui-widgets/src/lib/
├── button/
│   └── button.component.ts
├── input/
│   └── input.component.ts
├── card/
│   └── card.component.ts
├── modal/
│   └── modal.component.ts
├── list/
│   └── list.component.ts
├── toolbar/
│   └── toolbar.component.ts
└── toast/
    ├── toast.service.ts
    ├── toast-item.component.ts
    └── toast-container.component.ts
```

---

## 🚀 Como Importar nos Micro Front-Ends

### No seu module/component standalone:

```typescript
import {
  ButtonComponent,
  InputComponent,
  CardComponent,
  ModalComponent,
  ListComponent,
  ToolbarComponent,
  ToastContainerComponent,
  ToastService
} from '@superapp/ui-widgets';

@Component({
  selector: 'app-exemplo',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    CardComponent,
    ModalComponent,
    ListComponent,
    ToolbarComponent,
    ToastContainerComponent
  ],
  // ...
})
```

---

## 1️⃣ BUTTON — Botões Temáveis

### 📂 Arquivo: `projects/ui-widgets/src/lib/button/button.component.ts`

### ✨ Features:

- 4 variantes (primary, secondary, outlined, ghost)
- 3 tamanhos (sm: 32px, md: 40px, lg: 48px)
- Estados: hover, active, disabled, focus
- 100% acessível (ARIA, keyboard navigation)

### 💻 Como Usar:

```html
<!-- Primary (Verde sucesso Caixa) -->
<ui-button variant="primary">Confirmar</ui-button>

<!-- Secondary (Laranja Caixa) -->
<ui-button variant="secondary">Cancelar</ui-button>

<!-- Outlined -->
<ui-button variant="outlined" size="sm">Ver mais</ui-button>

<!-- Ghost -->
<ui-button variant="ghost" [disabled]="true">Desabilitado</ui-button>

<!-- Large -->
<ui-button variant="primary" size="lg" type="submit">
  Enviar Formulário
</ui-button>
```

### 🎨 Tokens Usados:

```css
--color-success (primary)
--color-secondary (secondary)
--color-brand (outlined/ghost)
--spacing-sm, --spacing-md, --spacing-lg
--radius-md
--shadow-sm
--fontSize-sm, --fontSize-md, --fontSize-lg
--fontWeight-semibold
```

---

## 2️⃣ INPUT — Campos de Texto

### 📂 Arquivo: `projects/ui-widgets/src/lib/input/input.component.ts`

### ✨ Features:

- Label opcional
- Required indicator (\*)
- Placeholder
- Hint text
- Error message
- Estados visuais completos

### 💻 Como Usar:

```html
<!-- Simples -->
<ui-input
  id="nome"
  label="Nome completo"
  placeholder="Digite seu nome"
  [required]="true"
></ui-input>

<!-- Com hint -->
<ui-input
  id="email"
  type="email"
  label="E-mail"
  hint="Será usado para recuperação de senha"
></ui-input>

<!-- Com erro -->
<ui-input
  id="cpf"
  label="CPF"
  [error]="cpfInvalido ? 'CPF inválido' : undefined"
  [required]="true"
></ui-input>

<!-- Disabled -->
<ui-input
  label="Campo bloqueado"
  [disabled]="true"
  [readonly]="true"
></ui-input>
```

### 🎨 Tokens Usados:

```css
--color-text-primary, --color-text-secondary, --color-text-tertiary
--color-bg-surface, --color-bg-secondary
--color-border
--color-brand, --color-brand-hover
--color-error
--color-primary-10 (focus ring)
--spacing-xs, --spacing-md
--radius-md
```

---

## 3️⃣ CARD — Cartões de Conteúdo

### 📂 Arquivo: `projects/ui-widgets/src/lib/card/card.component.ts`

### ✨ Features:

- Header opcional (título + subtítulo + ação)
- Imagem/media opcional
- Body para conteúdo
- Footer para ações
- Variantes: elevated, interactive

### 💻 Como Usar:

```html
<!-- Card simples -->
<ui-card title="Título do Card" subtitle="Descrição breve">
  <p>Conteúdo do card aqui...</p>
</ui-card>

<!-- Card com imagem -->
<ui-card
  title="Benefício Saúde"
  imageUrl="/assets/saude.jpg"
  imageAlt="Plano de saúde"
  [elevated]="true"
>
  <p>Cobertura completa para você e sua família.</p>
</ui-card>

<!-- Card interativo (clicável) -->
<ui-card
  title="Ver Detalhes"
  [interactive]="true"
  [elevated]="true"
  (click)="abrirDetalhes()"
>
  <p>Clique para expandir</p>
</ui-card>

<!-- Card com header action e footer -->
<ui-card
  title="Solicitação Pendente"
  subtitle="Aguardando aprovação"
  [headerAction]="true"
  [hasFooter]="true"
>
  <button card-header-action>⋮</button>

  <p>Sua solicitação de férias foi enviada.</p>

  <div card-actions>
    <ui-button variant="outlined" size="sm">Cancelar</ui-button>
    <ui-button variant="primary" size="sm">Aprovar</ui-button>
  </div>
</ui-card>

<!-- Card compacto -->
<ui-card compact title="Resumo">
  <p>Menos padding</p>
</ui-card>
```

### 🎨 Tokens Usados:

```css
--color-bg-surface, --color-bg-base, --color-bg-secondary
--color-border
--color-brand
--color-text-primary, --color-text-secondary
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg
--radius-lg
--shadow-md, --shadow-lg
```

---

## 4️⃣ MODAL — Diálogos

### 📂 Arquivo: `projects/ui-widgets/src/lib/modal/modal.component.ts`

### ✨ Features:

- 4 tamanhos (sm: 400px, md: 600px, lg: 800px, xl: 1200px)
- Header com título e botão close
- Body scrollável
- Footer opcional
- Fecha com ESC ou clique no overlay
- Animações suaves

### 💻 Como Usar:

```typescript
// No component
export class MeuComponent {
  modalAberto = false;

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }
}
```

```html
<!-- Modal básico -->
<ui-modal
  [isOpen]="modalAberto"
  title="Confirmar Ação"
  size="sm"
  (modalClose)="fecharModal()"
>
  <p>Tem certeza que deseja continuar?</p>
</ui-modal>

<!-- Modal com footer -->
<ui-modal
  [isOpen]="modalAberto"
  title="Editar Perfil"
  size="md"
  [hasFooter]="true"
  (modalClose)="fecharModal()"
>
  <form>
    <ui-input label="Nome" required></ui-input>
    <ui-input label="E-mail" type="email"></ui-input>
  </form>

  <div modal-footer>
    <ui-button variant="outlined" (click)="fecharModal()">Cancelar</ui-button>
    <ui-button variant="primary">Salvar</ui-button>
  </div>
</ui-modal>

<!-- Modal grande sem close button -->
<ui-modal
  [isOpen]="modalAberto"
  title="Visualização Completa"
  size="xl"
  [showClose]="false"
  [closeOnOverlayClick]="false"
  (modalClose)="fecharModal()"
>
  <p>Só fecha programaticamente</p>
</ui-modal>
```

### 🎨 Tokens Usados:

```css
--color-bg-surface, --color-bg-base, --color-bg-secondary
--color-border
--color-brand
--color-text-primary, --color-text-secondary
--spacing-sm, --spacing-md, --spacing-lg
--radius-sm, --radius-lg
--shadow-lg
```

---

## 5️⃣ LIST — Listas/Tabelas de Dados

### 📂 Arquivo: `projects/ui-widgets/src/lib/list/list.component.ts`

### ✨ Features:

- Colunas configuráveis
- Ordenação (sort)
- Seleção de linhas
- Empty state
- Loading state
- Striped/hover
- Templates customizados
- Responsivo (mobile = cards)

### 💻 Como Usar:

```typescript
// No component
export class MeuComponent {
  colunas: ListColumn[] = [
    { key: 'nome', label: 'Nome', sortable: true, width: '40%' },
    { key: 'email', label: 'E-mail', sortable: true, width: '35%' },
    { key: 'status', label: 'Status', width: '25%' },
  ];

  pessoas = [
    { id: 1, nome: 'João Silva', email: 'joao@caixa.gov.br', status: 'Ativo' },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria@caixa.gov.br',
      status: 'Inativo',
    },
  ];

  loading = false;
  selecionados: any[] = [];

  onSort(event: { key: string; direction: 'asc' | 'desc' }) {
    console.log('Ordenar por:', event);
    // Implementar ordenação
  }

  onRowClick(pessoa: any) {
    console.log('Clicou em:', pessoa);
  }
}
```

```html
<!-- Lista básica -->
<ui-list
  [items]="pessoas"
  [columns]="colunas"
  [striped]="true"
  [hoverable]="true"
  (rowClick)="onRowClick($event)"
  (sort)="onSort($event)"
></ui-list>

<!-- Com loading -->
<ui-list [items]="pessoas" [columns]="colunas" [loading]="loading"></ui-list>

<!-- Empty state customizado -->
<ui-list
  [items]="[]"
  [columns]="colunas"
  emptyMessage="Nenhuma pessoa encontrada"
></ui-list>

<!-- Com empty state custom -->
<ui-list [items]="[]" [columns]="colunas" [hasEmptyState]="true">
  <div empty-state>
    <h3>Ops! Lista vazia</h3>
    <p>Adicione o primeiro item</p>
    <ui-button>Adicionar</ui-button>
  </div>
</ui-list>

<!-- Com itens selecionados -->
<ui-list
  [items]="pessoas"
  [columns]="colunas"
  [selectedItems]="selecionados"
></ui-list>
```

### 🎨 Tokens Usados:

```css
--color-bg-surface, --color-bg-base
--color-border
--color-brand
--color-primary-10 (selected)
--color-text-primary, --color-text-secondary, --color-text-tertiary
--spacing-xs, --spacing-sm, --spacing-md, --spacing-2xl
--radius-lg
```

---

## 6️⃣ TOOLBAR — Barra de Navegação

### 📂 Arquivo: `projects/ui-widgets/src/lib/toolbar/toolbar.component.ts`

### ✨ Features:

- Logo/brand
- Ações esquerda e direita
- Badges de notificação
- Ícones built-in (menu, search, notifications, settings, user, logout)
- Responsivo

### 💻 Como Usar:

```typescript
// No component
export class AppComponent {
  acoesEsquerda: ToolbarAction[] = [
    { id: 'menu', label: 'Menu', icon: 'menu' },
    { id: 'search', label: 'Buscar', icon: 'search' },
  ];

  acoesDireita: ToolbarAction[] = [
    { id: 'notif', label: 'Notificações', icon: 'notifications', badge: 5 },
    { id: 'config', label: 'Configurações', icon: 'settings' },
    { id: 'perfil', label: 'Perfil', icon: 'user' },
    { id: 'sair', label: 'Sair', icon: 'logout' },
  ];

  onAction(action: ToolbarAction) {
    console.log('Ação:', action.id);
  }
}
```

```html
<!-- Toolbar completo -->
<ui-toolbar
  brandName="Super App Pessoas"
  brandLogo="/assets/logo-caixa.svg"
  [elevated]="true"
  [leftActions]="acoesEsquerda"
  [rightActions]="acoesDireita"
  (actionClick)="onAction($event)"
>
  <div toolbar-center>
    <!-- Conteúdo central opcional -->
    <h1>Dashboard</h1>
  </div>
</ui-toolbar>

<!-- Toolbar simples -->
<ui-toolbar
  brandName="Caixa"
  [leftActions]="[{ id: 'menu', label: 'Menu', icon: 'menu' }]"
  [rightActions]="[{ id: 'user', label: 'Perfil', icon: 'user' }]"
></ui-toolbar>
```

### 🎨 Tokens Usados:

```css
--color-bg-surface, --color-bg-secondary
--color-border
--color-brand
--color-error (badge)
--color-text-primary, --color-text-inverse
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg
--radius-sm, --radius-md, --radius-full
--shadow-md
```

---

## 7️⃣ TOAST — Notificações

### 📂 Arquivos:

- `projects/ui-widgets/src/lib/toast/toast.service.ts`
- `projects/ui-widgets/src/lib/toast/toast-container.component.ts`

### ✨ Features:

- 4 tipos (success, error, warning, info)
- Duração configurável
- Ação opcional (botão)
- Dismissible
- 6 posições (top-right, top-left, bottom-right, etc)
- Auto-dismiss

### 💻 Como Usar:

#### 1. Adicione o container no `app.component.html`:

```html
<!-- No root do app -->
<ui-toast-container position="top-right"></ui-toast-container>

<router-outlet></router-outlet>
```

#### 2. Injete o serviço e use:

```typescript
import { ToastService } from '@superapp/ui-widgets';

export class MeuComponent {
  constructor(private toast: ToastService) {}

  salvar() {
    // Success
    this.toast.success('Dados salvos com sucesso!', 'Sucesso');

    // Error
    this.toast.error('Erro ao salvar', 'Erro', 10000); // 10 segundos

    // Warning
    this.toast.warning('Atenção: dados pendentes', 'Aviso');

    // Info
    this.toast.info('Processamento iniciado', 'Informação');

    // Custom com ação
    this.toast.show({
      type: 'success',
      title: 'Arquivo enviado',
      message: 'Upload concluído com sucesso',
      duration: 5000,
      action: {
        label: 'Visualizar',
        callback: () => {
          console.log('Abrir arquivo');
        },
      },
    });

    // Sem auto-dismiss
    const id = this.toast.show({
      type: 'info',
      message: 'Processando...',
      duration: 0, // Não fecha automaticamente
      dismissible: false,
    });

    // Fechar manualmente depois
    setTimeout(() => {
      this.toast.dismiss(id);
    }, 3000);
  }

  limparTodos() {
    this.toast.dismissAll();
  }
}
```

### 🎨 Tokens Usados:

```css
--color-success, --color-error, --color-warning, --color-info
--color-bg-surface, --color-bg-secondary
--color-border
--color-brand
--color-text-primary, --color-text-secondary, --color-text-tertiary
--spacing-xs, --spacing-sm, --spacing-md
--radius-sm, --radius-md
--shadow-lg
```

---

## 🎨 Todos os Componentes Usam Estes Tokens:

```css
/* Cores principais */
--color-brand: #0066CC
--color-brand-hover: #00547A
--color-secondary: #F68000
--color-success: #17C6A3
--color-error: #EE3F2D
--color-warning: #FFD900
--color-info: #0081B7

/* Textos */
--color-text-primary: #222326
--color-text-secondary: #515359
--color-text-tertiary: #80838C
--color-text-inverse: #FFFFFF

/* Fundos */
--color-bg-base: #EEEFF7
--color-bg-surface: #FFFFFF
--color-bg-secondary: #D7D8E5
--color-border: #B0B2BF

/* Espaçamentos */
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
--spacing-2xl: 48px

/* Radius */
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-full: 9999px

/* Sombras */
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1)
--shadow-md: 0 4px 8px rgba(0,0,0,0.12)
--shadow-lg: 0 8px 16px -2px rgba(0,0,0,0.15)

/* Tipografia */
--font-sans: 'CAIXA Std', 'Open Sans', system-ui
--fontSize-sm: 14px
--fontSize-md: 16px
--fontSize-lg: 18px
--fontSize-xl: 20px
--fontWeight-medium: 500
--fontWeight-semibold: 600
```

---

## 🏗️ Uso em Micro Front-Ends

### Opção 1: Module Federation (recomendado para escala)

```typescript
// No remote MFE
import { ButtonComponent, CardComponent } from '@superapp/ui-widgets';

@Component({
  selector: 'mfe-beneficios',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <ui-card title="Plano de Saúde">
      <p>Cobertura completa</p>
      <ui-button variant="primary">Solicitar</ui-button>
    </ui-card>
  `,
})
export class BeneficiosComponent {}
```

### Opção 2: Angular Elements (web components)

```typescript
// Converter para custom element
import { createCustomElement } from '@angular/elements';

const buttonElement = createCustomElement(ButtonComponent, { injector });
customElements.define('caixa-button', buttonElement);
```

```html
<!-- Usar em qualquer lugar -->
<caixa-button variant="primary">Click me</caixa-button>
```

---

## 📱 Responsividade

Todos os componentes são **mobile-first**:

- **Button**: mantém proporções
- **Input**: ajusta padding
- **Card**: stack em mobile
- **Modal**: fullscreen em mobile (<640px)
- **List**: vira cards em mobile
- **Toolbar**: esconde center section, reduz padding
- **Toast**: ajusta largura

---

## ♿ Acessibilidade

Todos os componentes incluem:

- ✅ ARIA labels e roles
- ✅ Focus visible (outline 2px)
- ✅ Navegação por teclado
- ✅ `prefers-reduced-motion` support
- ✅ Contraste conforme WCAG 2.1 AA

---

## 🚀 Próximos Passos

1. **PWA** → Service Worker + manifest
2. **Storybook** → Documentação visual
3. **Tests** → Unit + axe-core
4. **Modo Alto Contraste** → theme adicional
5. **i18n** → Tradução de labels

---

## 📞 Suporte

Dúvidas? Issues? Consulte:

- 📄 `brief-pwa-angular-white-label-v2.2.md`
- 🎨 `projects/ui-tokens/src/contracts/brands/cef-light.json`
