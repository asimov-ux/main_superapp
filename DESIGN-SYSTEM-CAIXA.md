# Design System Caixa Econômica Federal

## 📋 Visão Geral

Este documento descreve todos os componentes, tokens e padrões do Design System da Caixa Econômica Federal identificados a partir do Figma oficial.

---

## 🎨 Design Tokens

### Cores

#### Cores Primárias

- **Primary** (`#0066CC`): Azul Caixa - Cor principal da marca
- **Secondary** (`#F68000`): Laranja Caixa - Cor secundária

#### Cores de Feedback

- **Success** (`#4CAF50`): Verde - Operações bem-sucedidas
- **Danger** (`#D32F2F`): Vermelho - Erros e alertas críticos
- **Warning** (`#F68000`): Laranja - Avisos e atenções
- **Info** (`#0066CC`): Azul - Informações gerais

#### Cores de Texto

- **Primary** (`#212121`): Texto principal
- **Secondary** (`#757575`): Texto secundário
- **Disabled** (`#BDBDBD`): Texto desabilitado
- **Inverse** (`#FFFFFF`): Texto sobre fundos escuros

#### Cores de Fundo

- **Primary** (`#FFFFFF`): Fundo principal
- **Secondary** (`#F5F5F5`): Fundo secundário
- **Tertiary** (`#E0E0E0`): Fundo terciário

#### Cores de Borda

- **Default** (`#BDBDBD`): Borda padrão
- **Focus** (`#0066CC`): Borda em foco
- **Error** (`#D32F2F`): Borda de erro

### Tipografia

#### Família de Fonte

- **Base**: Roboto, Arial, Helvetica, sans-serif

#### Tamanhos de Fonte

- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **md**: 1rem (16px) - Base
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)

#### Pesos de Fonte

- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

#### Altura de Linha

- **Tight**: 1.25
- **Normal**: 1.5
- **Relaxed**: 1.75

### Espaçamento

- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

### Border Radius

- **none**: 0
- **sm**: 0.25rem (4px)
- **md**: 0.5rem (8px)
- **lg**: 0.75rem (12px)
- **full**: 9999px (círculo)

### Sombras

- **sm**: `0 1px 2px rgba(0, 0, 0, 0.05)`
- **md**: `0 2px 8px rgba(0, 0, 0, 0.1)`
- **lg**: `0 4px 16px rgba(0, 0, 0, 0.15)`

---

## 🧩 Componentes

### 1. DscButton (Botão)

**Descrição**: Elemento interativo fundamental para ações do usuário.

#### Variantes

- `primary`: Botão primário (azul #0066CC)
- `secondary`: Botão secundário (azul #0066CC secondary)
- `danger`: Botão de perigo (vermelho #D32F2F)
- `outlined`: Botão com borda
- `text`: Botão apenas texto
- `auxiliary`: Botão auxiliar

#### Tamanhos

- `small`: 8px × 16px padding, 14px fonte
- `standard`: 12px × 24px padding, 16px fonte (padrão)
- `large`: 16px × 32px padding, 18px fonte

#### Tipos

- `button`: Ação regular
- `submit`: Envio de formulário
- `reset`: Reset de formulário

#### Estados Visuais

- Normal
- Hover (escurecimento)
- Focus (borda azul)
- Active (pressed)
- Disabled (opacidade 50%, cursor not-allowed)

#### Suporte a Ícones

- `iconPrefix`: Ícone à esquerda do texto
- `iconSuffix`: Ícone à direita do texto
- `icon`: Botão apenas com ícone (circular)
- `iconStyle`: "filled" | "outlined"
- **Biblioteca**: Material Icons

#### Acessibilidade

- `ariaLabel`: Texto de acessibilidade
- Suporte completo a navegação por teclado
- Focus visível

#### Exemplos de Uso

```html
<!-- Botão Primary -->
<dsc-button
  [label]="'Salvar'"
  [variant]="'primary'"
  [size]="'standard'"
  [type]="'submit'"
  (buttonClick)="salvar()"
>
</dsc-button>

<!-- Botão com Ícone Prefixado -->
<dsc-button
  [label]="'Button with Icon'"
  [variant]="'primary'"
  [iconPrefix]="'add'"
  [iconStyle]="'iconStyle'"
>
</dsc-button>

<!-- Botão de Envio -->
<dsc-button
  [label]="'Submit Form'"
  [variant]="'primary'"
  [type]="'submit'"
  [iconSuffix]="'send'"
>
</dsc-button>
```

---

### 2. DscAlert (Alerta)

**Descrição**: Componente para exibir mensagens de feedback ao usuário.

#### Variantes Semânticas

- `success`: Sucesso (verde #4CAF50, ícone check)
- `danger`: Erro (vermelho #D32F2F, ícone error)
- `warning`: Atenção (laranja #F68000, ícone warning)
- `info`: Informação (azul #0066CC, ícone info)

#### Características Principais

- **Ícones Contextuais**: Ícones automáticos baseados na variante
- **Flexibilidade de Conteúdo**: Mensagem única ou lista de mensagens
- **Suporte a HTML**: Permite HTML embutido (links interativos, formatação)
- **Título Opcional**: Possibilidade de adicionar título ao alerta
- **Customização Visual**: Controle sobre exibição de ícones

#### Recursos

- `title`: Título do alerta (opcional)
- `message`: Mensagem principal
- `list`: Array de mensagens (para múltiplos itens)
- `showIcon`: true/false (exibe/oculta ícone)
- `linkFunction`: Callback para cliques em links personalizados

#### Casos de Uso Comuns

- Confirmação de operações bem-sucedidas
- Notificação de erros em formulários
- Avisos sobre ações irreversíveis
- Informações sobre estado do sistema
- Validação de campos em tempo real
- Mensagens de feedback pós-submissão

#### Exemplos de Uso

```html
<!-- Alerta Básico -->
<dsc-alert
  [title]="'Atenção'"
  [message]="'Esta ação não pode ser desfeita.'"
  [variant]="'warning'"
  [showIcon]="'true'"
>
</dsc-alert>

<!-- Alerta com Lista -->
<dsc-alert
  [title]="'Múltiplas mensagens'"
  [list]="['Primeira mensagem de alerta', 'Segunda mensagem', 'Terceira mensagem']"
  [variant]="'warning'"
  [showIcon]="'true'"
>
</dsc-alert>

<!-- Alerta com HTML -->
<dsc-alert
  [title]="'Lista com links'"
  [list]="['Mensagem com <a href=\'#\' class=\'custom-link\'>link clicável</a>', 'Outra mensagem simples']"
  [variant]="'info'"
  [showIcon]="'true'"
  (linkFunction)="aoClicarLink()"
>
</dsc-alert>

<!-- Alerta Sem Ícone -->
<dsc-alert
  [message]="'Alerta sem ícone'"
  [variant]="'info'"
  [showIcon]="'false'"
>
</dsc-alert>

<!-- Alerta Sem Título -->
<dsc-alert
  [message]="'Alerta sem título, apenas mensagem.'"
  [variant]="'success'"
  [showIcon]="'true'"
>
</dsc-alert>
```

---

### 3. DscSelect (Seleção)

**Descrição**: Lista suspensa para seleção de opções com recursos avançados.

#### Características Principais

- **Seleção Simples ou Múltipla**: Controle via propriedade `multiple`
- **Filtro de Opções**: Busca em tempo real nas opções
- **Agrupamento**: Organização de opções em grupos (`optgroup`)
- **Tamanhos**: small, standard, large
- **Ícones**: Suporte a ícone prefix
- **Dicas e Tooltips**: Label hint com tooltip opcional

#### Propriedades

- `label`: Rótulo do campo de seleção
- `placeholder`: Texto quando nenhuma opção está selecionada
- `options`: Array de opções ({ value, label, disabled?, options? })
- `multiple`: boolean (seleção múltipla)
- `showFilter`: boolean (exibe campo de filtro)
- `disabled`: boolean (desabilita o campo)
- `size`: "small" | "standard" | "large"
- `labelHint`: Texto de dica adicional ao rótulo
- `labelHintTooltip`: Tooltip com informações adicionais
- `iconPrefix`: Ícone prefixado ao campo
- `formFieldHint`: Texto de dica abaixo do campo
- `errorMessage`: Mensagem de erro (quando inválido)

#### Opções com Interface Option

```typescript
interface Option {
  value: any;
  label: string;
  disabled?: boolean;
  options?: Option[]; // Para sub-opções em optgroup
}
```

#### Eventos

- `selectionChange`: Emitido quando a seleção é alterada
- `openedChange`: Emitido quando o menu é aberto/fechado

#### Validação

- Integração com formulários: `ControlValueAccessor`
- Mensagens de erro personalizadas

#### Casos de Uso Comuns

- Seleção de país, estado, cidade
- Escolha de categorias e tags
- Filtros de pesquisa
- Seleção de usuários ou grupos
- Opções de configuração
- Formulários de cadastro

#### Exemplos de Uso

```html
<!-- Seleção Básica -->
<dsc-select
  [label]="'Escolha uma opção'"
  [placeholder]="'Selecione...'"
  [options]="opcoes"
  [(ngModel)]="opcaoSelecionada"
>
</dsc-select>

<!-- Seleção Múltipla com Filtro -->
<dsc-select
  [label]="'Habilidades Técnicas (múltipla seleção)'"
  [placeholder]="'Busque e selecione suas habilidades'"
  [options]="habilidades"
  [multiple]="'true'"
  [showFilter]="'true'"
  [iconPrefix]="'search'"
  (selectionChange)="onSelectionChange($event)"
>
</dsc-select>

<!-- Com Agrupamentos -->
<dsc-select
  [label]="'Tecnologias'"
  [placeholder]="'Selecione uma tecnologia'"
  [options]="tecnologias"
  [showFilter]="'true'"
>
</dsc-select>

<!-- Com Tooltips e Dicas -->
<dsc-select
  [label]="'Nível de Prioridade (obrigatório)'"
  [placeholder]="'Escolha a prioridade'"
  [options]="prioridades"
  [labelHint]="'labelHint'"
  [labelHintTooltip]="'labelHintTooltip'"
  [formFieldHint]="'formFieldHint'"
>
</dsc-select>

<!-- Com Ícone -->
<dsc-select
  [label]="'Categoria'"
  [placeholder]="'Selecione uma categoria'"
  [options]="categorias"
  [iconPrefix]="'category'"
>
</dsc-select>

<!-- Diferentes Tamanhos -->
<dsc-select [size]="'small'" [label]="'Pequeno'"></dsc-select>
<dsc-select [size]="'standard'" [label]="'Médio (padrão)'"></dsc-select>
<dsc-select [size]="'large'" [label]="'Grande'"></dsc-select>

<!-- Desabilitado -->
<dsc-select
  [label]="'Campo Desabilitado'"
  [placeholder]="'Este campo está desabilitado'"
  [disabled]="'true'"
>
</dsc-select>

<!-- Com Opções Desabilitadas -->
<dsc-select
  [label]="'Status do Projeto'"
  [options]="[
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2', disabled: true },
    { value: '3', label: 'Opção 3' }
  ]"
>
</dsc-select>
```

---

### 4. DscTable (Tabela)

**Descrição**: Apresenta dados em formato tabular com suporte a paginação, filtros e ordenação.

#### Características Principais

- **Paginação**: Navegação entre páginas de dados
- **Ordenação**: Colunas sortable
- **Seleção**: Checkbox ou radio-button para linhas
- **Linhas Expansíveis**: Expandir para mostrar conteúdo adicional
- **Altura Configurável**: tableMaxHeight, tableRowHeight

#### Propriedades Base

- `data`: Array de objetos (dados da tabela)
- `columns`: Array de `DscTableColumn[]`
- `tableMaxHeight`: Altura máxima em pixels (scroll quando excede)
- `tableRowHeight`: Altura das linhas (padrão: 64px)

#### Seleção

- `selectorType`: "checkbox" | "radio-button"
- `selectedItems`: Array de itens selecionados

#### Paginação

- `paginator`: boolean (habilita paginação)
- `paginatorPageIndex`: Índice da página atual
- `paginatorPageSize`: Itens por página
- `hidePaginatorRangeLabel`: Oculta label de intervalo
- `disabledPaginator`: Desabilita paginador
- `backendPagination`: Paginação controlada pelo backend

#### Expansão

- `expandable`: boolean (permite linhas expansíveis)
- `expandedDetailTemplate`: TemplateRef para conteúdo expandido

#### Eventos

- Eventos de seleção
- Eventos de paginação
- Eventos de ordenação

#### Interface DscTableColumn

```typescript
interface DscTableColumn {
  property: string;
  title: string;
  width?: number;
  sortable?: boolean;
  value?: (obj: any) => any;
}
```

#### Exemplos de Uso

```typescript
// Definição de colunas
const columns: DscTableColumn[] = [
  {
    property: 'id',
    title: 'ID',
    width: 80,
    sortable: true,
    value: (obj: any) => obj.id,
  },
  {
    property: 'nome',
    title: 'Nome',
    sortable: true,
    value: (obj: any) => obj.nome,
  },
];

const data: ExampleData[] = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao.silva@exemplo.com',
    status: 'Ativo',
    dataCadastro: '15/03/2025',
  },
  {
    id: 2,
    nome: 'Maria Santos',
    email: 'maria.santos@exemplo.com',
    status: 'Ativo',
    dataCadastro: '20/03/2025',
  },
];
```

```html
<!-- Tabela Básica -->
<dsc-table
  [columns]="columns"
  [data]="data"
  [tableMaxHeight]="'300'"
  [tableRowHeight]="'64'"
>
</dsc-table>

<!-- Com Seleção Checkbox -->
<dsc-table
  [columns]="columns"
  [data]="data"
  [selectorType]="'checkbox'"
  [selectedItems]="selectedItems"
>
</dsc-table>

<!-- Com Seleção Radio -->
<dsc-table
  [columns]="columns"
  [data]="data"
  [selectorType]="'radio-button'"
  [selectedItems]="selectedRadioItem"
>
</dsc-table>

<!-- Com Altura Máxima -->
<dsc-table
  [columns]="columns"
  [data]="data"
  [tableMaxHeight]="'tableMaxHeight'"
>
</dsc-table>

<!-- Com Linhas Personalizadas -->
<dsc-table
  [columns]="columns"
  [data]="data"
  [tableRowHeight]="'tableRowHeight'"
>
</dsc-table>

<!-- Vazia (sem dados) -->
<dsc-table
  [columns]="columns"
  [data]="[]"
  [emptyMessageData]="'Nenhum registro encontrado'"
>
</dsc-table>

<!-- Expansível -->
<dsc-table
  [columns]="columns"
  [data]="data"
  [expandable]="'true'"
  [expandedDetailTemplate]="'expandedDetailTemplate'"
>
</dsc-table>

<!-- Seleção Múltipla com Expansão -->
<dsc-table
  [columns]="columns"
  [data]="data"
  [selectorType]="'checkbox'"
  [expandable]="'expandable'"
  [selectedItems]="selectedItems"
  [expandedDetailTemplate]="'expandedDetailTemplate'"
>
</dsc-table>
```

---

### 5. DscPaginator (Paginador)

**Descrição**: Controla a navegação de páginas em grandes conjuntos de dados.

#### Características Principais

- **Navegação Completa**: Botões anterior, próximo, primeira e última página
- **Tamanho de Página Configurável**: Opções para alterar itens por página
- **Informações de Intervalo**: Exibe "1-10 de 100"
- **Estado Desabilitado**: Controle de habilitação
- **Botões Opcionais**: Mostrar/ocultar primeira e última página
- **Eventos**: Emissão de eventos de mudança de página

#### Propriedades

- `length`: Total de itens
- `pageSize`: Itens por página (padrão: 10)
- `pageIndex`: Índice da página atual (baseado em 0)
- `pageSizeOptions`: Array com opções de tamanho ([5, 10, 25, 100])
- `hidePaginatorRangeLabel`: Oculta label "1-10 de 100"
- `disabledPaginator`: Desabilita o paginador
- `showFirstLastButtons`: Exibe botões de primeira/última página (padrão: false)
- `hidePageSize`: Oculta seletor de tamanho de página
- `showPageSizeOptions`: Exibe opções de tamanho de página

#### Eventos

- `(page)`: Emitido quando a página muda (EventEmitter<any>)

#### Casos de Uso Comuns

- Tabelas com muitos registros
- Listagens de produtos
- Resultados de busca
- Galerias de imagens
- Logs e históricos
- Relatórios extensos

#### Exemplos de Uso

```html
<!-- Básico -->
<dsc-paginator
  [length]="100"
  [pageSize]="10"
  [pageSizeOptions]="[5, 10, 25, 100]"
  [pageIndex]="0"
  (page)="onPageChange($event)"
>
</dsc-paginator>

<!-- Tamanhos de Página Personalizados -->
<dsc-paginator
  [length]="500"
  [pageSize]="25"
  [pageSizeOptions]="[5, 10, 25, 100]"
  (page)="onPageChange($event)"
>
</dsc-paginator>

<!-- Sem Botões de Primeira/Última Página -->
<dsc-paginator [length]="100" [pageSize]="10" [showFirstLastButtons]="false">
</dsc-paginator>

<!-- Com Dicas e Tooltips -->
<dsc-paginator [length]="100" [pageSize]="10" [hidePaginatorRangeLabel]="false">
</dsc-paginator>
```

```typescript
// Component
export class ExemploComponent {
  totalItems = 100;
  itemsPorPagina = 10;

  onPageChange(event: any) {
    console.log('Página:', event);
    // Implementar ação customizada
  }
}
```

---

### 6. DscButtonHeader (Botão de Cabeçalho)

**Descrição**: Botão com ícone para cabeçalhos que pode incluir um rótulo de texto.

#### Características Principais

- **Ícone do Material Design**: Configurável via propriedade `icon`
- **Label Opcional**: Texto exibido no botão
- **Acessibilidade**: Suporte a `ariaLabel` e navegação por teclado
- **TabIndex**: Controle da ordem de tabulação

#### Propriedades

- `icon`: Nome do ícone do Material Design
- `label`: Texto exibido no botão (padrão: "Menu")
- `tabIndex`: Ordem de tabulação (padrão: 0)
- `dscTooltip`: Tooltip exibido ao passar o mouse
- `ariaLabel`: Texto de acessibilidade

#### Eventos

- `buttonClick`: EventEmitter<void> - Evento emitido ao clicar

#### Casos de Uso Comuns

- Botão de menu hambúrguer em cabeçalhos
- Botões de ações rápidas (buscar, notificações, perfil)
- Exclusão de itens
- Ícones de navegação

#### Exemplos de Uso

```html
<!-- Básico (Menu) -->
<dsc-button-header [icon]="'menu'" [label]="'Menu'" (buttonClick)="abrirMenu()">
</dsc-button-header>

<!-- Sem Rótulo (ícone home) -->
<dsc-button-header [icon]="'home'" (buttonClick)="irParaHome()">
</dsc-button-header>

<!-- Com Tooltip -->
<dsc-button-header
  [icon]="'settings'"
  [dscTooltip]="'Configurações'"
  (buttonClick)="abrirConfiguracoes()"
>
</dsc-button-header>

<!-- Com Aria Label -->
<dsc-button-header
  [icon]="'search'"
  [label]="'Buscar'"
  [ariaLabel]="'Buscar conteúdo'"
  (buttonClick)="buscar()"
>
</dsc-button-header>

<!-- Com Ícone de Notificação -->
<dsc-button-header
  [icon]="'notifications'"
  [label]="'Notificações'"
  (buttonClick)="abrirNotificacoes()"
>
</dsc-button-header>

<!-- Com Ícone de Perfil -->
<dsc-button-header
  [icon]="'account_circle'"
  [label]="'Perfil'"
  (buttonClick)="abrirPerfil()"
>
</dsc-button-header>

<!-- Excluir (ícone de lixeira) -->
<dsc-button-header [icon]="'delete'" (buttonClick)="excluir()">
</dsc-button-header>
```

---

## 📐 Diretrizes de Design

### Espaçamento Interno dos Componentes

- **Botões**: 12px vertical, 24px horizontal (standard)
- **Inputs**: 12px vertical, 16px horizontal
- **Cards**: 16px padding
- **Alerts**: 16px padding

### Hierarquia Visual

1. Usar Primary (#0066CC) para ações principais
2. Usar Secondary (#F68000) para ações secundárias
3. Usar Danger (#D32F2F) para ações destrutivas
4. Usar variantes outlined/text para ações terciárias

### Acessibilidade

- Contraste mínimo de 4.5:1 para textos normais
- Contraste mínimo de 3:1 para textos grandes (18px+)
- Suporte completo a navegação por teclado
- Labels descritivos para leitores de tela
- Estados de foco claramente visíveis

### Responsividade

- Mobile-first approach
- Breakpoints:
  - **xs**: < 600px (mobile)
  - **sm**: 600px - 960px (tablet portrait)
  - **md**: 960px - 1280px (tablet landscape)
  - **lg**: 1280px - 1920px (desktop)
  - **xl**: > 1920px (large desktop)

---

## 🔄 Changelog

**Versão 1.0.0** (10/12/2025)

- Documentação inicial completa baseada no Figma da Caixa
- 6 componentes principais documentados
- Design tokens DTCG completos
- Exemplos de uso para todos os componentes

---

## 📚 Referências

- **Figma Oficial**: Material fornecido pela Caixa Econômica Federal
- **Material Icons**: https://fonts.google.com/icons
- **DTCG Format**: Design Tokens Community Group specification
- **WCAG 2.1**: Web Content Accessibility Guidelines

---

**Mantido por**: Equipe de Design System
**Última atualização**: 10 de dezembro de 2025
