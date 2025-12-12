import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Beneficio {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  categoriaLabel: string;
  valorMensal?: number;
  status: 'ativo' | 'inativo';
  prazoAnalise: number;
  icon: string;
}

@Component({
  selector: 'app-beneficios-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="beneficios-container">
      <!-- Header -->
      <header class="page-header">
        <h1>Benefícios Disponíveis</h1>
        <p class="subtitle">Conheça os benefícios oferecidos pela CAIXA</p>
      </header>

      <!-- Filtros -->
      <div class="filters-container">
        <div class="filters-scroll">
          <div class="filters">
            <button
              *ngFor="let cat of categorias"
              class="filter-btn"
              [class.active]="categoriaAtiva === cat.id"
              (click)="filtrar(cat.id)"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Grid de Benefícios -->
      <div class="beneficios-grid">
        <div
          *ngFor="let b of beneficiosFiltrados"
          class="beneficio-card"
          (click)="verDetalhes(b)"
        >
          <div class="card-header">
            <div class="card-icon-container">
              <div class="card-icon" [innerHTML]="b.icon"></div>
            </div>
            <div class="card-title">
              <span class="nome">{{ b.nome }}</span>
              <span class="status" [class.ativo]="b.status === 'ativo'">
                {{ b.status === 'ativo' ? 'ATIVO' : 'INATIVO' }}
              </span>
            </div>
          </div>

          <div class="card-content">
            <p class="descricao">{{ b.descricao }}</p>

            <div class="card-info">
              <div class="info-row" *ngIf="b.valorMensal">
                <span class="label">Valor mensal:</span>
                <span class="valor">{{
                  b.valorMensal | currency : 'BRL'
                }}</span>
              </div>
              <div class="info-row">
                <span class="label">Prazo de análise:</span>
                <span class="text"
                  >{{ b.prazoAnalise }} dia{{
                    b.prazoAnalise !== 1 ? 's' : ''
                  }}
                  útil{{ b.prazoAnalise !== 1 ? 'es' : '' }}</span
                >
              </div>
            </div>
          </div>

          <div class="card-footer">
            <span class="categoria-tag">{{ b.categoriaLabel }}</span>
            <div class="button-container">
              <button
                class="btn-detalhes"
                (click)="verDetalhes(b); $event.stopPropagation()"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* ===== VARIÁVEIS E RESET ===== */
      :host {
        --color-primary: #005ca9;
        --color-primary-dark: #004080;
        --color-primary-light: #e3f2fd;
        --color-success: #2e7d32;
        --color-surface: #f5f5f5;
        --color-text: #1a1a1a;
        --color-text-secondary: #666;
        --color-border: #e0e0e0;
        --color-white: #fff;
        --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08);
        --shadow-card-hover: 0 4px 16px rgba(0, 92, 169, 0.12);
      }

      .beneficios-container {
        padding: 24px;
        font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
        background: var(--color-surface);
        min-height: calc(100vh - 140px);
        width: 100%;
        box-sizing: border-box;
      }

      /* ===== HEADER ===== */
      .page-header {
        margin-bottom: 24px;
      }

      .page-header h1 {
        font-size: 24px;
        font-weight: 600;
        color: var(--color-text);
        margin: 0 0 8px 0;
        line-height: 1.3;
      }

      .subtitle {
        font-size: 14px;
        color: var(--color-text-secondary);
        margin: 0;
        line-height: 1.5;
      }

      /* ===== FILTROS ===== */
      .filters-container {
        margin-bottom: 24px;
        position: relative;
      }

      .filters-scroll {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none; /* Firefox */
      }

      .filters-scroll::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Edge */
      }

      .filters {
        display: inline-flex;
        gap: 8px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--color-border);
        min-width: min-content;
        white-space: nowrap;
      }

      .filter-btn {
        padding: 8px 16px;
        border: 1px solid var(--color-border);
        background: var(--color-white);
        font-family: 'Segoe UI', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: var(--color-text);
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s ease;
        flex-shrink: 0;
        height: 36px;
        box-sizing: border-box;
      }

      .filter-btn:hover {
        border-color: var(--color-primary);
        color: var(--color-primary);
      }

      .filter-btn.active {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: var(--color-white);
        font-weight: 600;
      }

      /* ===== GRID ===== */
      .beneficios-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        width: 100%;
      }

      /* ===== CARD ===== */
      .beneficio-card {
        background: var(--color-white);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 280px;
        box-sizing: border-box;
      }

      .beneficio-card:hover {
        border-color: var(--color-primary);
        box-shadow: var(--shadow-card-hover);
        transform: translateY(-2px);
      }

      /* CARD HEADER */
      .card-header {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 20px 20px 0;
        flex-shrink: 0;
      }

      .card-icon-container {
        flex-shrink: 0;
      }

      .card-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-primary-light);
        color: var(--color-primary);
        border-radius: 8px;
        flex-shrink: 0;
      }

      .card-title {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .nome {
        font-size: 16px;
        font-weight: 600;
        color: var(--color-text);
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .status {
        align-self: flex-start;
        font-size: 11px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .status.ativo {
        background: #e8f5e9;
        color: var(--color-success);
      }

      .status:not(.ativo) {
        background: #ffebee;
        color: #c62828;
      }

      /* CARD CONTENT */
      .card-content {
        padding: 16px 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .descricao {
        font-size: 13px;
        color: var(--color-text-secondary);
        line-height: 1.5;
        margin: 0 0 16px 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex: 1;
      }

      .card-info {
        border-top: 1px solid #f0f0f0;
        padding-top: 12px;
        margin-top: auto;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 0;
      }

      .info-row:last-child {
        padding-bottom: 0;
      }

      .label {
        font-size: 12px;
        color: var(--color-text-secondary);
        font-weight: 400;
      }

      .valor {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-text);
      }

      .text {
        font-size: 13px;
        font-weight: 500;
        color: var(--color-text);
      }

      /* CARD FOOTER - CORRIGIDO */
      .card-footer {
        padding: 16px 20px 20px;
        border-top: 1px solid #f0f0f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }

      .categoria-tag {
        font-size: 11px;
        font-weight: 700;
        color: var(--color-primary);
        background: var(--color-primary-light);
        padding: 4px 10px;
        border-radius: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 40%;
      }

      .button-container {
        flex-shrink: 0;
        width: auto;
      }

      .btn-detalhes {
        padding: 8px 16px;
        background: var(--color-primary);
        color: var(--color-white);
        border: none;
        font-family: 'Segoe UI', sans-serif;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s ease;
        white-space: nowrap;
        min-width: 100px;
        height: 36px;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .btn-detalhes:hover {
        background: var(--color-primary-dark);
      }

      /* ===== RESPONSIVIDADE ===== */
      @media (max-width: 1200px) {
        .beneficios-grid {
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
      }

      @media (max-width: 768px) {
        .beneficios-container {
          padding: 16px;
          min-height: calc(100vh - 120px);
        }

        .page-header h1 {
          font-size: 20px;
        }

        .subtitle {
          font-size: 13px;
        }

        .beneficios-grid {
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .beneficio-card {
          min-height: auto;
        }

        .card-header {
          padding: 16px 16px 0;
        }

        .card-content {
          padding: 12px 16px;
        }

        .card-footer {
          padding: 12px 16px 16px;
        }

        .btn-detalhes {
          padding: 7px 14px;
          font-size: 12px;
          min-width: 90px;
          height: 32px;
        }

        .categoria-tag {
          font-size: 10px;
          padding: 3px 8px;
          max-width: 35%;
        }
      }

      @media (max-width: 480px) {
        .beneficios-container {
          padding: 12px;
        }

        .page-header {
          margin-bottom: 20px;
        }

        .filters {
          gap: 6px;
          padding-bottom: 12px;
        }

        .filter-btn {
          padding: 6px 12px;
          font-size: 12px;
          height: 32px;
        }

        .beneficios-grid {
          gap: 12px;
        }

        .card-icon {
          width: 36px;
          height: 36px;
        }

        .nome {
          font-size: 15px;
        }

        .descricao {
          font-size: 12px;
          -webkit-line-clamp: 2;
        }

        .card-footer {
          gap: 8px;
        }

        .categoria-tag {
          max-width: 30%;
        }
      }

      /* ===== ESTADO FOCUS ===== */
      .filter-btn:focus-visible,
      .btn-detalhes:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }

      /* ===== MODO ESCURO ===== */
      @media (prefers-color-scheme: dark) {
        :host {
          --color-primary: #4dabf7;
          --color-primary-dark: #339af0;
          --color-primary-light: #1e3a8a;
          --color-success: #68d391;
          --color-surface: #1a1a1a;
          --color-text: #e0e0e0;
          --color-text-secondary: #a0a0a0;
          --color-border: #404040;
          --color-white: #2d2d2d;
          --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.3);
          --shadow-card-hover: 0 4px 16px rgba(77, 171, 247, 0.2);
        }

        .status.ativo {
          background: #1e3a2e;
          color: #68d391;
        }

        .status:not(.ativo) {
          background: #3c1e1e;
          color: #fc8181;
        }

        .card-info {
          border-top-color: #404040;
        }

        .card-footer {
          border-top-color: #404040;
        }
      }
    `,
  ],
})
export class BeneficiosPageComponent {
  categoriaAtiva = 'todos';

  categorias = [
    { id: 'todos', label: 'Todos' },
    { id: 'saude', label: 'Saúde' },
    { id: 'alimentacao', label: 'Alimentação' },
    { id: 'transporte', label: 'Transporte' },
    { id: 'educacao', label: 'Educação' },
    { id: 'previdencia', label: 'Previdência' },
    { id: 'familia', label: 'Família' },
    { id: 'qualidade', label: 'Qualidade de Vida' },
    { id: 'financeiro', label: 'Financeiro' },
  ];

  beneficios: Beneficio[] = [
    // SAÚDE
    {
      id: 'saude-caixa',
      nome: 'Saúde CAIXA - Plano de Saúde',
      descricao:
        'Plano de saúde completo com cobertura nacional e rede credenciada ampla para você e seus dependentes.',
      categoria: 'saude',
      categoriaLabel: 'SAÚDE',
      valorMensal: 450.0,
      status: 'ativo',
      prazoAnalise: 5,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2c.28 0 .55.03.82.08A3.5 3.5 0 0 1 17 5.5c0 2.9-1.64 5.47-3.68 7.41A25.2 25.2 0 0 1 10 15.66a25.2 25.2 0 0 1-3.32-2.75C4.64 10.97 3 8.41 3 5.5a3.5 3.5 0 0 1 6.18-2.25c.27-.17.54-.25.82-.25z"/></svg>',
    },
    // ALIMENTAÇÃO
    {
      id: 'vale-alimentacao',
      nome: 'Vale Alimentação',
      descricao:
        'Cartão alimentação para compras em supermercados e mercearias.',
      categoria: 'alimentacao',
      categoriaLabel: 'ALIMENTAÇÃO',
      valorMensal: 600.0,
      status: 'ativo',
      prazoAnalise: 2,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M7 2v5.5a1 1 0 0 1-.68.95l-.12.03-.1.01a1 1 0 0 1-.1.01H5v9.5a1 1 0 0 1-2 0v-16a1 1 0 0 1 2 0V7h.5a.5.5 0 0 0 .5-.41V2a1 1 0 0 1 .88-1H7a1 1 0 0 1 1 1zm4-1a1 1 0 0 1 1 .88V6h3V2a1 1 0 1 1 2 0v16a1 1 0 1 1-2 0v-6a2 2 0 0 1-2-2V8h-1v2a2 2 0 0 1-2 2v6a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1h2z"/></svg>',
    },
    {
      id: 'cesta-alimentacao',
      nome: 'Cesta Alimentação',
      descricao:
        'Benefício mensal para despesas com alimentação, complementando o vale-alimentação.',
      categoria: 'alimentacao',
      categoriaLabel: 'ALIMENTAÇÃO',
      valorMensal: 400.0,
      status: 'ativo',
      prazoAnalise: 2,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M3 6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1H3V6zm-.45 3h14.9l-.9 8.1a2 2 0 0 1-2 1.9H6.45a2 2 0 0 1-1.99-1.9L3.55 9z"/></svg>',
    },
    {
      id: '13-cesta',
      nome: '13ª Cesta Alimentação',
      descricao: 'Pagamento adicional de cesta alimentação no final do ano.',
      categoria: 'alimentacao',
      categoriaLabel: 'ALIMENTAÇÃO',
      valorMensal: 400.0,
      status: 'ativo',
      prazoAnalise: 1,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 11H9V7h2v6zm-1 2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',
    },
    // TRANSPORTE
    {
      id: 'vale-transporte',
      nome: 'Vale Transporte',
      descricao:
        'Auxílio para deslocamento casa-trabalho com desconto de até 6% do salário.',
      categoria: 'transporte',
      categoriaLabel: 'TRANSPORTE',
      valorMensal: 220.0,
      status: 'ativo',
      prazoAnalise: 3,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M4 5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v9a2 2 0 0 1-2 2v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V16H8v1.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V16a2 2 0 0 1-2-2V5zm3-1a1 1 0 0 0-1 1v4h8V5a1 1 0 0 0-1-1H7zm-1 8a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm7 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>',
    },
    // EDUCAÇÃO
    {
      id: 'auxilio-educacao',
      nome: 'Auxílio Educação',
      descricao:
        'Bolsa para cursos de graduação e pós-graduação em instituições reconhecidas.',
      categoria: 'educacao',
      categoriaLabel: 'EDUCAÇÃO',
      valorMensal: 800.0,
      status: 'ativo',
      prazoAnalise: 10,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 3L2 7l8 4 6-3v5.5a.5.5 0 0 0 1 0V8l1-.5-8-4.5zM4 9.5V13l6 3 6-3V9.5l-6 3-6-3z"/></svg>',
    },
    // PREVIDÊNCIA
    {
      id: 'funcef',
      nome: 'FUNCEF - Previdência Complementar',
      descricao: `# Planejamento Previdenciário para Funcionários da CAIXA: Seu Futuro em Duas Bases Sólidas

Prezado(a) Colega,

Como funcionário(a) da CAIXA, você possui uma estrutura previdenciária diferenciada e robusta, composta por dois pilares fundamentais: **o INSS (Regime Geral de Previdência Social)** e **a FUNCEF (Fundo de Pensão dos Funcionários da CAIXA)**. Entender como esses regimes se complementam é essencial para garantir uma aposentadoria tranquila e com o padrão de vida desejado.

## Os Dois Pilares da sua Segurança Financeira Futura

### 1. O Pilar Público: O INSS
**Função:** Garante uma renda básica com benefícios essenciais como aposentadoria por idade, tempo de contribuição, auxílio-doença, aposentadoria por invalidez e pensão por morte.

**Atenção:** O valor do INSS tem um teto definido (R$ 7.786,02 em 2024) e, sozinho, pode não ser suficiente para manter seu padrão de vida atual na aposentadoria.

### 2. O Pilar Complementar: A FUNCEF
**Função:** Atua como complemento essencial ao INSS, com o objetivo de substituir uma parcela maior da sua renda ativa. Seu benefício na FUNCEF é construído através:
- Das suas contribuições obrigatórias e facultativas
- Das contribuições patronais da CAIXA
- Da rentabilidade dos investimentos do fundo ao longo do tempo

##  A Chave do Sucesso: A Sinergia entre INSS e FUNCEF

O planejamento eficaz consiste em **gerenciar estrategicamente a soma do que você receberá do INSS e do que acumulou na FUNCEF**, visando alcançar uma renda total que atenda às suas necessidades e expectativas futuras.

##  Estratégias Práticas para Maximizar sua Aposentadoria

### 1. **Compreenda sua Situação na FUNCEF: Portabilidade/Migração**
Se você possui histórico em planos antigos da FUNCEF (como REG/REPLAN) e participou de processos de migração, é **crucial entender**:
- Qual é o seu saldo acumulado atual
- Em qual plano você está hoje (Novo Plano ou Repactuado)
- Como seu benefício será calculado (as regras podem ter mudado significativamente)

**Conhecimento é poder:** Acesse o portal da FUNCEF ou entre em contato com o atendimento para esclarecer suas dúvidas.

### 2. **Explore o Poder da Contribuição Adicional**
As **contribuições facultativas** na FUNCEF são uma ferramenta poderosa para:
- "Engordar" seu saldo de forma significativa
- Aproveitar o potencial de rentabilidade de longo prazo
- Reduzir sua carga tributária atual (as contribuições podem ser deduzidas do IR)
- Garantir uma renda extra na aposentadoria

**Dica:** Considere destinar parte de aumentos salariais ou gratificações para contribuições esporádicas.

### 3. **Simule Seu Futuro Regularmente**
Utilize as **ferramentas de simulação** disponíveis:
- **Portal da FUNCEF:** Simule diferentes cenários de contribuição e projeções de acumulação
- **Meu INSS:** Calcule estimativas de seus benefícios no regime geral

**Benefícios das simulações:**
- Verificar se a renda projetada atinge sua meta pessoal
- Ajustar suas contribuições mensais caso o valor esteja abaixo do esperado
- Planejar o melhor momento para se aposentar, considerando idade, tempo de contribuição e regras aplicáveis

### 4. **Mantenha seu Histórico Previdenciário Impecável**
- **CNIS (Cadastro Nacional de Informações Sociais):** Verifique regularmente se todos seus vínculos e períodos de contribuição estão corretos
- **Documentação da FUNCEF:** Guarde comprovantes de contribuições e comunicações importantes
- **Atualização Cadastral:** Mantenha seus dados pessoais e de beneficiários sempre atualizados em ambos os sistemas

##  Aspectos Críticos que Merecem sua Atenção

1. **Diferentes Formas de Recebimento:** A FUNCEF oferece opções como renda vitalícia, temporária ou programada. Escolha a que melhor se adapta ao seu perfil e expectativas.

2. **Questão Tributária:** Entenda como seus benefícios serão tributados na fonte (INSS e FUNCEF têm tratamentos diferentes).

3. **Beneficiários:** Sua escolha de beneficiários na FUNCEF é independente do INSS. Revise e atualize regularmente.

4. **Mudanças Normativas:** Tanto o INSS quanto a previdência complementar (regulada pela PREVIC) podem sofrer alterações legislativas. Mantenha-se informado.

## Faça seu Planejamento HOJE

1. **Diagnóstico:** Reúna todas as informações sobre suas posições no INSS e FUNCEF
2. **Projeção:** Estime suas necessidades futuras (70-80% da renda atual é uma referência comum)
3. **Gap Analysis:** Identifique a diferença entre o que os dois pilares proporcionarão e o que você precisa
4. **Ajuste:** Aumente contribuições ou revise expectativas conforme necessário
5. **Monitoramento:** Revise seu plano anualmente ou após eventos importantes da vida

##  Recursos Oficiais Essenciais

- **FUNCEF:** www.funcef.com.br (simuladores, extrato, regulamento)
- **Meu INSS:** meuinss.gov.br (extrato, simulações, agendamentos)
- **PREVIC:** www.previc.gov.br (informações sobre previdência complementar)
- **CAIXA:** Consulte o canal interno de recursos humanos para orientações específicas

## Conclusão: Você é o Arquitecto da sua Aposentadoria

A combinação INSS + FUNCEF representa um **diferencial competitivo** na sua carreira na CAIXA. No entanto, esse potencial só se concretiza com **planejamento ativo e contínuo**.

Comece hoje a construir conscientemente o seu futuro. Pequenas decisões tomadas agora podem fazer uma diferença significativa na qualidade de vida do seu "eu" aposentado.

*Lembre-se: Este material tem caráter educativo e informativo. Para decisões específicas sobre seu plano, consulte sempre os canais oficiais da FUNCEF e INSS, e considere a orientação de um especialista em planejamento previdenciário.*`,
      categoria: 'previdencia',
      categoriaLabel: 'PREVIDÊNCIA',
      valorMensal: 500.0,
      status: 'ativo',
      prazoAnalise: 7,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2H3V4zm0 4h14v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8zm5 2a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H8z"/></svg>',
    },
    {
      id: 'fgts',
      nome: 'FGTS',
      descricao:
        'Fundo de Garantia por Tempo de Serviço, recolhido mensalmente pela CAIXA.',
      categoria: 'financeiro',
      categoriaLabel: 'FINANCEIRO',
      status: 'ativo',
      prazoAnalise: 1,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M15 5H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>',
    },
    // FINANCEIRO
    {
      id: 'plr',
      nome: 'PLR - Participação nos Lucros',
      descricao:
        'Participação nos Lucros e Resultados paga anualmente de acordo com o desempenho do banco.',
      categoria: 'financeiro',
      categoriaLabel: 'FINANCEIRO',
      status: 'ativo',
      prazoAnalise: 1,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1H2V4zm0 3h16v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7zm4 2v2h3V9H6zm0 3v2h3v-2H6zm5-3v2h3V9h-3zm0 3v2h3v-2h-3z"/></svg>',
    },
    // FAMÍLIA
    {
      id: 'auxilio-creche',
      nome: 'Auxílio-creche/Babá',
      descricao:
        'Auxílio mensal para despesas com creche ou babá para filhos de até 7 anos.',
      categoria: 'familia',
      categoriaLabel: 'FAMÍLIA',
      valorMensal: 650.0,
      status: 'ativo',
      prazoAnalise: 5,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 8a7 7 0 1 1 14 0H3z"/></svg>',
    },
    {
      id: 'licenca-maternidade',
      nome: 'Licença-maternidade e Paternidade',
      descricao:
        'Licença remunerada de 180 dias para mães e 20 dias para pais.',
      categoria: 'familia',
      categoriaLabel: 'FAMÍLIA',
      status: 'ativo',
      prazoAnalise: 3,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM5 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm10 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM2 18a3 3 0 0 1 6 0H2zm6 0a5 5 0 0 1 4-4.9 5 5 0 0 1 4 4.9h-8zm10 0a3 3 0 0 0-6 0h6z"/></svg>',
    },
    // QUALIDADE DE VIDA
    {
      id: 'gympass',
      nome: 'Gympass',
      descricao:
        'Acesso a rede de academias, estúdios e atividades físicas em todo o Brasil.',
      categoria: 'qualidade',
      categoriaLabel: 'QUALIDADE DE VIDA',
      valorMensal: 120.0,
      status: 'ativo',
      prazoAnalise: 1,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M4.5 8a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0V9h2v2.5a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5h-3zm7 0a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0V9h2v2.5a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5h-3zM2 7h16v6H2V7z"/></svg>',
    },
    {
      id: 'caixa-movimenta',
      nome: 'CAIXA Movimenta',
      descricao:
        'Programa de incentivo à prática de atividades físicas e bem-estar dos empregados.',
      categoria: 'qualidade',
      categoriaLabel: 'QUALIDADE DE VIDA',
      status: 'ativo',
      prazoAnalise: 1,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm3.7 5.3-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4L9 9.17l3.3-3.3a1 1 0 0 1 1.4 1.42z"/></svg>',
    },
    {
      id: 'pcmso',
      nome: 'PCMSO',
      descricao:
        'Programa de Controle Médico de Saúde Ocupacional com exames periódicos e acompanhamento.',
      categoria: 'qualidade',
      categoriaLabel: 'QUALIDADE DE VIDA',
      status: 'ativo',
      prazoAnalise: 2,
      icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 0 0-2 0v2H4a1 1 0 0 0 0 2h2v2a1 1 0 1 0 2 0V7h2a1 1 0 1 0 0-2H8V3zm2 9a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1z"/></svg>',
    },
  ];

  constructor(private router: Router) {}

  get beneficiosFiltrados(): Beneficio[] {
    if (this.categoriaAtiva === 'todos') {
      return this.beneficios;
    }
    return this.beneficios.filter((b) => b.categoria === this.categoriaAtiva);
  }

  filtrar(categoria: string): void {
    this.categoriaAtiva = categoria;
  }

  verDetalhes(beneficio: Beneficio): void {
    if (beneficio.id === 'funcef') {
      this.router.navigate(['/funcef']);
    } else {
      console.log('Ver detalhes de:', beneficio.nome);
    }
  }
}
