# 🎯 SUPER APP DE PESSOAS - DOCUMENTO MESTRE

> **Última atualização:** 11/12/2025 - 15:30
> **Status:** Em Desenvolvimento Ativo
> **Versão:** 1.2.0

---

## 📋 VISÃO GERAL

### O que é

Plataforma unificada onde colaboradores, ex-colaboradores e familiares da CAIXA podem realizar todas as interações relacionadas ao vínculo de trabalho, benefícios e bem-estar.

### Stack Técnica

- **Frontend:** Angular 19 (Standalone Components)
- **PWA:** Service Worker ativo com cache strategies
- **Design System:** CAIXA DSC + 150+ tokens de cores
- **Arquitetura:** White-label com BrandService

---

## 🏗️ ESTRUTURA DO PROJETO

```
angular-superapp/
├── projects/
│   ├── people-superapp/          # 🏠 App principal (PWA Host)
│   │   ├── src/app/
│   │   │   ├── people-list/      # Lista de pessoas
│   │   │   ├── people-detail/    # Detalhe de pessoa
│   │   │   ├── services/         # PeopleService (mock)
│   │   │   └── brand-selector/   # Troca de tema
│   │   └── src/assets/
│   │       ├── mock/             # 📦 Dados mock (people.json)
│   │       └── brands/           # CSS de marcas
│   │
│   ├── core/                     # 🔧 Serviços compartilhados
│   │   └── src/lib/services/
│   │       ├── brand.service.ts
│   │       └── mock-data.service.ts
│   │
│   ├── ui-tokens/                # 🎨 Design Tokens (DTCG)
│   │   ├── brands/               # JSON de tokens por marca
│   │   ├── schema/               # Contrato de validação
│   │   └── scripts/              # Build CSS
│   │
│   ├── ui-widgets/               # 🧩 Componentes UI temáveis
│   │   └── src/lib/
│   │       ├── button/           ✅ Pronto (100% tokens)
│   │       ├── card/             ✅ Pronto
│   │       ├── input/            ✅ Pronto
│   │       ├── list/             ✅ Pronto
│   │       ├── modal/            ✅ Pronto
│   │       ├── toast/            ✅ Pronto
│   │       └── toolbar/          ✅ Pronto
│   │
│   ├── dsc-components/           # 🏛️ Design System CAIXA
│   │   └── src/lib/
│   │       ├── dsc-alert/        ✅ Usando tokens
│   │       ├── dsc-button/       ✅ Usando tokens
│   │       ├── dsc-logo/         ✅ Pronto
│   │       ├── dsc-paginator/    ✅ Usando tokens
│   │       ├── dsc-select/       ✅ Usando tokens
│   │       ├── dsc-table/        ✅ Usando tokens
│   │       └── dsc-button-header/✅ Pronto
│   │
│   ├── feature-people/           # 👥 Módulo Pessoas
│   │   └── src/lib/
│   │       ├── pages/
│   │       ├── services/
│   │       ├── stores/
│   │       └── models/
│   │
│   ├── feature-beneficios/       # 🎁 Módulo Benefícios
│   │   └── src/lib/
│   │       ├── pages/
│   │       │   ├── beneficios-list.component.ts
│   │       │   ├── beneficio-detail.component.ts
│   │       │   └── minhas-solicitacoes.component.ts
│   │       └── services/
│   │
│   └── feature-dashboard/        # 📊 Dashboard (planejado)
│
└── tools/                        # Scripts de build
```

---

## ✅ STATUS ATUAL (11/12/2025)

### O que está FUNCIONANDO ✅

| Módulo               | Status       | Descrição                                                   |
| -------------------- | ------------ | ----------------------------------------------------------- |
| **Design System**    | ✅ 100%      | 150+ tokens de cores, gradientes, tipografia                |
| **Storybook**        | ✅ 100%      | Rodando em localhost:6006                                   |
| **PWA**              | ✅ 100%      | Service Worker, update prompt, offline                      |
| **People List**      | ✅ Funcional | Lista de pessoas com mock                                   |
| **People Detail**    | ✅ Funcional | Detalhe com edição                                          |
| **Benefícios**       | ✅ Funcional | Lista + Detalhes + Solicitações                             |
| **Build Production** | ✅ Funcional | Compila sem erros                                           |
| **ui-widgets**       | ✅ 7/7       | Button, Card, Input, List, Modal, Toast, Toolbar            |
| **dsc-components**   | ✅ 7/7       | Alert, Button, Logo, Paginator, Select, Table, ButtonHeader |
| **Header CAIXA**     | ✅ Funcional | Header profissional com navegação e branding                |
| **Calendário Gantt** | ✅ Funcional | Timeline visual de ausências (Gantt-style)                  |
| **Dashboard**        | ✅ Funcional | Métricas, gráficos e ações rápidas                          |

### O que está PARCIAL ⚠️

| Módulo                  | Status | Problema                                    |
| ----------------------- | ------ | ------------------------------------------- |
| **feature-people**      | ⚠️ 60% | Store implementada mas não conectada ao app |
| **Gestão de Ausências** | ⚠️ 70% | Calendário pronto, falta CRUD completo      |

### O que está FALTANDO ❌

| Componente            | Prioridade | Descrição                    |
| --------------------- | ---------- | ---------------------------- |
| **Módulo Ausências**  | 🔴 Alta    | CRUD + Workflow de aprovação |
| **Autenticação**      | 🔴 Alta    | Login + Controle de acesso   |
| **Notificações**      | 🟡 Média   | Sistema de alertas push      |
| **Relatórios**        | 🟡 Média   | Dashboards gerenciais        |
| **Upload Documentos** | 🟡 Média   | Atestados, comprovantes      |

---

## 📦 BANCO DE DADOS MOCK

### Status: ✅ FUNCIONANDO

O mock está localizado em:

```
projects/people-superapp/src/assets/mock/people.json
```

**Configuração:**

- Angular.json: Assets configurados corretamente
- HttpClient: Provido no app.config.ts
- PeopleService: Lê de `assets/mock/people.json`

**Dados disponíveis:**

```json
{
  "items": [
    {
      "id": "1",
      "nome": "João Silva",
      "cargo": "Analista",
      "unidade": "Agência Central",
      "ativo": true
    },
    {
      "id": "2",
      "nome": "Maria Oliveira",
      "cargo": "Gerente",
      "unidade": "Superintendência",
      "ativo": true
    },
    {
      "id": "3",
      "nome": "Carlos Santos",
      "cargo": "Coordenador",
      "unidade": "Filial Norte",
      "ativo": true
    },
    {
      "id": "4",
      "nome": "Ana Costa",
      "cargo": "Assistente",
      "unidade": "Agência Sul",
      "ativo": false
    }
  ],
  "total": 4
}
```

---

## 🗓️ PRÓXIMOS PASSOS (Priorizado)

### FASE 1: Calendário de Ausências (1-2 semanas)

**Prioridade: 🔴 CRÍTICA**

1. **Componente Calendário Gantt**

   - Instalar: `npm install gantt-schedule-timeline-calendar` ou usar alternativa Angular
   - Estrutura: Funcionários na lateral esquerda, dias no eixo horizontal
   - Tipos de ausência: Férias, Licença Médica, Licença Maternidade/Paternidade, Folga, Afastamento

2. **Modelo de Dados de Ausências**

   ```typescript
   interface Ausencia {
     id: string;
     pessoaId: string;
     tipo:
       | 'FERIAS'
       | 'LICENCA_MEDICA'
       | 'LICENCA_MATERNIDADE'
       | 'FOLGA'
       | 'AFASTAMENTO';
     dataInicio: Date;
     dataFim: Date;
     status:
       | 'PENDENTE'
       | 'APROVADA'
       | 'REJEITADA'
       | 'EM_ANDAMENTO'
       | 'CONCLUIDA';
     aprovadorId?: string;
     observacao?: string;
     documentos?: string[];
   }
   ```

3. **Visualizações**
   - Por equipe (gestor vê todos subordinados)
   - Por período (mensal, trimestral, anual)
   - Por tipo de ausência

### FASE 2: Módulo Gestão de Ausências (2-3 semanas)

1. **CRUD de Ausências**

   - Solicitar férias/licenças
   - Aprovar/Rejeitar (gestor)
   - Upload de documentos

2. **Workflow de Aprovação**

   - Solicitação → Análise RH → Aprovação Gestor → Confirmação
   - Notificações em cada etapa

3. **Integração com Calendário**
   - Bloquear datas já ocupadas
   - Mostrar conflitos de equipe
   - Cálculo automático de saldo de férias

### FASE 3: Dashboard Gerencial (1 semana)

1. **KPIs de Ausências**

   - Total de dias de ausência por tipo
   - Taxa de aprovação
   - Previsão de férias do time

2. **Gráficos**
   - Timeline de ausências
   - Pizza por tipo
   - Barras por departamento

### FASE 4: Autenticação (1 semana)

1. **Login CAIXA**

   - Integração Entra ID (Azure AD)
   - Roles: Colaborador, Gestor, RH, Admin

2. **Controle de Acesso**
   - Guards por rota
   - Permissões granulares

---

## 🧩 COMPONENTES A CRIAR

### 1. Calendário Gantt de Ausências

```
projects/ui-widgets/src/lib/calendar-gantt/
├── calendar-gantt.component.ts
├── calendar-gantt.component.scss
├── calendar-gantt.component.html
├── calendar-gantt.module.ts
├── models/
│   ├── calendar-event.model.ts
│   └── calendar-config.model.ts
└── services/
    └── calendar.service.ts
```

### 2. Módulo Feature-Ausencias

```
projects/feature-ausencias/
├── src/lib/
│   ├── pages/
│   │   ├── ausencias-calendar.component.ts    # Visualização calendário
│   │   ├── ausencias-list.component.ts        # Lista de solicitações
│   │   ├── ausencia-form.component.ts         # Formulário de solicitação
│   │   └── ausencia-aprovacao.component.ts    # Tela do gestor
│   ├── services/
│   │   └── ausencias.service.ts
│   ├── models/
│   │   └── ausencia.model.ts
│   └── ausencias.routes.ts
└── ng-package.json
```

### 3. Componentes Auxiliares Necessários

- **dsc-date-picker**: Seletor de datas com range
- **dsc-file-upload**: Upload de documentos
- **dsc-badge**: Status visual
- **dsc-timeline**: Histórico de eventos
- **dsc-avatar**: Foto do funcionário
- **dsc-chip**: Tags de tipo de ausência

---

## 📊 MÉTRICAS DO PROJETO

| Métrica           | Atual | Meta |
| ----------------- | ----- | ---- |
| Widgets UI        | 14/14 | 20+  |
| Features          | 2/6   | 6    |
| Tokens Coverage   | 95%   | 100% |
| Lighthouse PWA    | 90+   | 95+  |
| A11y Score        | 85    | 95+  |
| Storybook Stories | 15    | 30+  |
| Testes Unit       | 0%    | 70%  |
| Testes E2E        | 0%    | 50%  |

---

## 🔧 COMANDOS ÚTEIS

```bash
# Desenvolvimento
ng serve people-superapp --port 4200

# Storybook
npm run storybook

# Build Production
ng build people-superapp --configuration=production

# Build Tokens
node projects/ui-tokens/scripts/build-brand-css.js

# Lint
ng lint

# Testes
ng test
```

---

## 📝 DECISÕES ARQUITETURAIS

### 1. Separação de Concerns

- **ui-tokens**: Apenas tokens e geração de CSS
- **ui-widgets**: Componentes genéricos
- **dsc-components**: Componentes específicos CAIXA
- **feature-\***: Módulos de negócio

### 2. White-Label

- BrandService troca tema em runtime
- CSS gerado a partir de JSON (DTCG)
- Nenhum hardcode de cor nos componentes

### 3. PWA First

- Service Worker com cache strategies
- Update prompt para novas versões
- Manifest com ícones CAIXA

### 4. Mock First

- Dados em JSON para prototipagem rápida
- Serviços preparados para trocar para API real

---

## ⚠️ PROBLEMAS CONHECIDOS

1. **feature-people store não conectada** - Store existe mas não é usada pelo app principal
2. **Sass deprecation warnings** - dsc-components usa lighten/darken deprecados
3. **Tema ACME Dark** - Não carrega CSS corretamente

---

## 📅 HISTÓRICO DE ATUALIZAÇÕES

| Data       | Versão | Mudanças                                                        |
| ---------- | ------ | --------------------------------------------------------------- |
| 11/12/2025 | 1.2.0  | Header CAIXA profissional, Calendário Gantt, Dashboard completo |
| 11/12/2025 | 1.1.0  | Auditoria completa, correções de build, documentação            |
| 10/12/2025 | 1.0.0  | Sistema de tokens v2, 150+ cores, Storybook funcionando         |
| 09/12/2025 | 0.9.0  | PWA configurado, widgets MVP                                    |

---

## 🆕 CHANGELOG v1.2.0

### ✅ Implementado Hoje

1. **Header CAIXA Profissional**

   - Gradiente azul CAIXA (#005CA9 → #00437A)
   - Logo SVG com cores secundárias
   - Navegação com 4 rotas (Pessoas, Benefícios, Ausências, Dashboard)
   - Badge de notificações
   - Avatar de usuário
   - Responsivo (mobile: bottom nav)

2. **Calendário de Ausências (Gantt)**

   - Visualização por mês
   - Barras de ausência por funcionário
   - 7 tipos de ausência (férias, licença médica, maternidade, etc.)
   - Status visual (pendente, aprovado, rejeitado)
   - Modal de detalhes com aprovação/rejeição
   - Estatísticas agregadas

3. **Dashboard Completo**

   - 4 cards de métricas principais
   - Gráfico de barras (ausências por tipo)
   - Feed de atividades recentes
   - Status da equipe (presentes, ausentes, férias, home office)
   - Lista de próximos eventos
   - Ações rápidas

4. **Rotas Atualizadas**
   - `/ausencias` → AusenciasCalendarComponent
   - `/dashboard` → DashboardComponent

---

**Desenvolvido por:** asimov-ux  
**Repositório:** main_superapp  
**Branch:** main
