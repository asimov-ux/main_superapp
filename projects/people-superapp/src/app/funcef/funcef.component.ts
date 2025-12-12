import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcef',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="funcef-container">
      <!-- Header -->
      <div class="page-header">
        <button class="btn-voltar" (click)="voltar()">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          Voltar para Benefícios
        </button>
        <h1>FUNCEF - Previdência Complementar</h1>
      </div>

      <!-- Navegação Tabs -->
      <div class="tabs">
        <button
          class="tab"
          [class.active]="tabAtiva === 'visao-geral'"
          (click)="tabAtiva = 'visao-geral'"
        >
          Visão Geral
        </button>
        <button
          class="tab"
          [class.active]="tabAtiva === 'educacao'"
          (click)="tabAtiva = 'educacao'"
        >
          Educação Previdenciária
        </button>
        <button
          class="tab"
          [class.active]="tabAtiva === 'simulador'"
          (click)="tabAtiva = 'simulador'"
        >
          Simulador
        </button>
        <button
          class="tab"
          [class.active]="tabAtiva === 'links'"
          (click)="tabAtiva = 'links'"
        >
          Links Úteis
        </button>
      </div>

      <!-- Conteúdo -->
      <div class="tab-content">
        <!-- Visão Geral -->
        <div *ngIf="tabAtiva === 'visao-geral'" class="content-section">
          <div class="info-cards">
            <div class="info-card">
              <div class="card-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    d="M0 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V6zm2-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H2a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"
                  />
                </svg>
              </div>
              <h3>O que é a FUNCEF?</h3>
              <p>
                A FUNCEF é o Fundo de Pensão dos Funcionários da CAIXA, uma das
                maiores entidades de previdência complementar do país, com mais
                de 150 mil participantes.
              </p>
            </div>
            <div class="info-card">
              <div class="card-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"
                  />
                </svg>
              </div>
              <h3>Contribuição Patronal</h3>
              <p>
                A CAIXA contribui junto com você! Para cada real que você
                contribui, a empresa aporta um valor correspondente,
                potencializando sua reserva.
              </p>
            </div>
            <div class="info-card">
              <div class="card-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </div>
              <h3>Rentabilidade</h3>
              <p>
                Seus recursos são investidos profissionalmente em diversos
                ativos, buscando a melhor rentabilidade para garantir seu
                futuro.
              </p>
            </div>
          </div>

          <div class="beneficios-box">
            <h3>Benefícios da FUNCEF</h3>
            <ul>
              <li>Aposentadoria programada</li>
              <li>Aposentadoria por invalidez</li>
              <li>Pensão por morte</li>
              <li>Pecúlio por morte</li>
              <li>Auxílio-doença</li>
              <li>Contribuição facultativa com benefício fiscal</li>
            </ul>
          </div>
        </div>

        <!-- Educação Previdenciária -->
        <div
          *ngIf="tabAtiva === 'educacao'"
          class="content-section article-content"
        >
          <article class="artigo">
            <h2>
              Planejamento Previdenciário para Funcionários da CAIXA: Seu Futuro
              em Duas Bases Sólidas
            </h2>

            <p class="intro">Prezado(a) Colega,</p>

            <p>
              Como funcionário(a) da CAIXA, você possui uma estrutura
              previdenciária diferenciada e robusta, composta por dois pilares
              fundamentais:
              <strong>o INSS (Regime Geral de Previdência Social)</strong> e
              <strong
                >a FUNCEF (Fundo de Pensão dos Funcionários da CAIXA)</strong
              >. Entender como esses regimes se complementam é essencial para
              garantir uma aposentadoria tranquila e com o padrão de vida
              desejado.
            </p>

            <h3>Os Dois Pilares da sua Segurança Financeira Futura</h3>

            <div class="pilar-box">
              <h4>1. O Pilar Público: O INSS</h4>
              <p>
                <strong>Função:</strong> Garante uma renda básica com benefícios
                essenciais como aposentadoria por idade, tempo de contribuição,
                auxílio-doença, aposentadoria por invalidez e pensão por morte.
              </p>
              <div class="atencao">
                <strong>Atenção:</strong> O valor do INSS tem um teto definido
                (R$ 7.786,02 em 2024) e, sozinho, pode não ser suficiente para
                manter seu padrão de vida atual na aposentadoria.
              </div>
            </div>

            <div class="pilar-box">
              <h4>2. O Pilar Complementar: A FUNCEF</h4>
              <p>
                <strong>Função:</strong> Atua como complemento essencial ao
                INSS, com o objetivo de substituir uma parcela maior da sua
                renda ativa. Seu benefício na FUNCEF é construído através:
              </p>
              <ul>
                <li>Das suas contribuições obrigatórias e facultativas</li>
                <li>Das contribuições patronais da CAIXA</li>
                <li>
                  Da rentabilidade dos investimentos do fundo ao longo do tempo
                </li>
              </ul>
            </div>

            <div class="destaque-box">
              <h4>🔑 A Chave do Sucesso: A Sinergia entre INSS e FUNCEF</h4>
              <p>
                O planejamento eficaz consiste em
                <strong
                  >gerenciar estrategicamente a soma do que você receberá do
                  INSS e do que acumulou na FUNCEF</strong
                >, visando alcançar uma renda total que atenda às suas
                necessidades e expectativas futuras.
              </p>
            </div>

            <h3>Estratégias Práticas para Maximizar sua Aposentadoria</h3>

            <div class="estrategia">
              <h4>
                1. Compreenda sua Situação na FUNCEF: Portabilidade/Migração
              </h4>
              <p>
                Se você possui histórico em planos antigos da FUNCEF (como
                REG/REPLAN) e participou de processos de migração, é
                <strong>crucial entender:</strong>
              </p>
              <ul>
                <li>Qual é o seu saldo acumulado atual</li>
                <li>Em qual plano você está hoje (Novo Plano ou Repactuado)</li>
                <li>
                  Como seu benefício será calculado (as regras podem ter mudado
                  significativamente)
                </li>
              </ul>
              <p class="dica">
                <strong>Conhecimento é poder:</strong> Acesse o portal da FUNCEF
                ou entre em contato com o atendimento para esclarecer suas
                dúvidas.
              </p>
            </div>

            <div class="estrategia">
              <h4>2. Explore o Poder da Contribuição Adicional</h4>
              <p>
                As <strong>contribuições facultativas</strong> na FUNCEF são uma
                ferramenta poderosa para:
              </p>
              <ul>
                <li>"Engordar" seu saldo de forma significativa</li>
                <li>Aproveitar o potencial de rentabilidade de longo prazo</li>
                <li>
                  Reduzir sua carga tributária atual (as contribuições podem ser
                  deduzidas do IR)
                </li>
                <li>Garantir uma renda extra na aposentadoria</li>
              </ul>
              <p class="dica">
                <strong>Dica:</strong> Considere destinar parte de aumentos
                salariais ou gratificações para contribuições esporádicas.
              </p>
            </div>

            <div class="estrategia">
              <h4>3. Simule Seu Futuro Regularmente</h4>
              <p>
                Utilize as
                <strong>ferramentas de simulação</strong> disponíveis:
              </p>
              <ul>
                <li>
                  <strong>Portal da FUNCEF:</strong> Simule diferentes cenários
                  de contribuição e projeções de acumulação
                </li>
                <li>
                  <strong>Meu INSS:</strong> Calcule estimativas de seus
                  benefícios no regime geral
                </li>
              </ul>
              <p><strong>Benefícios das simulações:</strong></p>
              <ul>
                <li>Verificar se a renda projetada atinge sua meta pessoal</li>
                <li>
                  Ajustar suas contribuições mensais caso o valor esteja abaixo
                  do esperado
                </li>
                <li>
                  Planejar o melhor momento para se aposentar, considerando
                  idade, tempo de contribuição e regras aplicáveis
                </li>
              </ul>
            </div>

            <div class="estrategia">
              <h4>4. Mantenha seu Histórico Previdenciário Impecável</h4>
              <ul>
                <li>
                  <strong
                    >CNIS (Cadastro Nacional de Informações Sociais):</strong
                  >
                  Verifique regularmente se todos seus vínculos e períodos de
                  contribuição estão corretos
                </li>
                <li>
                  <strong>Documentação da FUNCEF:</strong> Guarde comprovantes
                  de contribuições e comunicações importantes
                </li>
                <li>
                  <strong>Atualização Cadastral:</strong> Mantenha seus dados
                  pessoais e de beneficiários sempre atualizados em ambos os
                  sistemas
                </li>
              </ul>
            </div>

            <h3>Aspectos Críticos que Merecem sua Atenção</h3>
            <ol class="aspectos-list">
              <li>
                <strong>Diferentes Formas de Recebimento:</strong> A FUNCEF
                oferece opções como renda vitalícia, temporária ou programada.
                Escolha a que melhor se adapta ao seu perfil e expectativas.
              </li>
              <li>
                <strong>Questão Tributária:</strong> Entenda como seus
                benefícios serão tributados na fonte (INSS e FUNCEF têm
                tratamentos diferentes).
              </li>
              <li>
                <strong>Beneficiários:</strong> Sua escolha de beneficiários na
                FUNCEF é independente do INSS. Revise e atualize regularmente.
              </li>
              <li>
                <strong>Mudanças Normativas:</strong> Tanto o INSS quanto a
                previdência complementar (regulada pela PREVIC) podem sofrer
                alterações legislativas. Mantenha-se informado.
              </li>
            </ol>

            <div class="planejamento-box">
              <h3>Faça seu Planejamento HOJE</h3>
              <ol>
                <li>
                  <strong>Diagnóstico:</strong> Reúna todas as informações sobre
                  suas posições no INSS e FUNCEF
                </li>
                <li>
                  <strong>Projeção:</strong> Estime suas necessidades futuras
                  (70-80% da renda atual é uma referência comum)
                </li>
                <li>
                  <strong>Gap Analysis:</strong> Identifique a diferença entre o
                  que os dois pilares proporcionarão e o que você precisa
                </li>
                <li>
                  <strong>Ajuste:</strong> Aumente contribuições ou revise
                  expectativas conforme necessário
                </li>
                <li>
                  <strong>Monitoramento:</strong> Revise seu plano anualmente ou
                  após eventos importantes da vida
                </li>
              </ol>
            </div>

            <div class="conclusao-box">
              <h3>Conclusão: Você é o Arquiteto da sua Aposentadoria</h3>
              <p>
                A combinação INSS + FUNCEF representa um
                <strong>diferencial competitivo</strong> na sua carreira na
                CAIXA. No entanto, esse potencial só se concretiza com
                <strong>planejamento ativo e contínuo</strong>.
              </p>
              <p>
                Comece hoje a construir conscientemente o seu futuro. Pequenas
                decisões tomadas agora podem fazer uma diferença significativa
                na qualidade de vida do seu "eu" aposentado.
              </p>
            </div>

            <p class="disclaimer">
              <em
                >Lembre-se: Este material tem caráter educativo e informativo.
                Para decisões específicas sobre seu plano, consulte sempre os
                canais oficiais da FUNCEF e INSS, e considere a orientação de um
                especialista em planejamento previdenciário.</em
              >
            </p>
          </article>
        </div>

        <!-- Simulador -->
        <div *ngIf="tabAtiva === 'simulador'" class="content-section">
          <div class="simulador-intro">
            <h3>Simule sua Aposentadoria</h3>
            <p>
              Utilize o simulador oficial da FUNCEF para projetar sua reserva e
              benefícios futuros.
            </p>
            <a
              href="https://www.funcef.com.br"
              target="_blank"
              class="btn-external"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                />
                <path
                  fill-rule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                />
              </svg>
              Acessar Simulador FUNCEF
            </a>
          </div>

          <div class="simulador-info">
            <h4>Informações para simulação</h4>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Contribuição mínima:</span>
                <span class="value">2% do salário</span>
              </div>
              <div class="info-item">
                <span class="label">Contribuição máxima:</span>
                <span class="value">Sem limite</span>
              </div>
              <div class="info-item">
                <span class="label">Contrapartida patronal:</span>
                <span class="value">100% até o teto</span>
              </div>
              <div class="info-item">
                <span class="label">Dedução IR:</span>
                <span class="value">Até 12% da renda</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Links Úteis -->
        <div *ngIf="tabAtiva === 'links'" class="content-section">
          <h3>Recursos Oficiais</h3>
          <div class="links-grid">
            <a
              href="https://www.funcef.com.br"
              target="_blank"
              class="link-card"
            >
              <div class="link-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"
                  />
                </svg>
              </div>
              <div class="link-info">
                <span class="link-title">Portal FUNCEF</span>
                <span class="link-desc">Simuladores, extrato, regulamento</span>
              </div>
            </a>

            <a href="https://meu.inss.gov.br" target="_blank" class="link-card">
              <div class="link-icon gov">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146z"
                  />
                </svg>
              </div>
              <div class="link-info">
                <span class="link-title">Meu INSS</span>
                <span class="link-desc">Extrato, simulações, agendamentos</span>
              </div>
            </a>

            <a
              href="https://www.previc.gov.br"
              target="_blank"
              class="link-card"
            >
              <div class="link-icon gov">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                  />
                  <path
                    d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"
                  />
                </svg>
              </div>
              <div class="link-info">
                <span class="link-title">PREVIC</span>
                <span class="link-desc"
                  >Informações sobre previdência complementar</span
                >
              </div>
            </a>

            <a href="#" class="link-card">
              <div class="link-icon caixa">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zM0 11v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3H0z"
                  />
                </svg>
              </div>
              <div class="link-info">
                <span class="link-title">Canal RH CAIXA</span>
                <span class="link-desc"
                  >Orientações específicas para empregados</span
                >
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .funcef-container {
        font-family: 'Segoe UI', -apple-system, sans-serif;
        background: var(--color-surface, #f5f5f5);
        min-height: calc(100vh - 100px);
      }

      /* Header */
      .page-header {
        background: #fff;
        padding: 16px 24px;
        border-bottom: 1px solid #e0e0e0;
      }

      .btn-voltar {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: transparent;
        border: 1px solid #d0d0d0;
        font-family: 'Segoe UI', sans-serif;
        font-size: 12px;
        color: #666;
        cursor: pointer;
        margin-bottom: 12px;
      }

      .btn-voltar:hover {
        border-color: #005ca9;
        color: #005ca9;
      }

      .page-header h1 {
        font-size: 20px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0;
      }

      /* Tabs */
      .tabs {
        display: flex;
        background: #fff;
        border-bottom: 1px solid #e0e0e0;
        padding: 0 24px;
      }

      .tab {
        padding: 12px 20px;
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        font-family: 'Segoe UI', sans-serif;
        font-size: 13px;
        color: #666;
        cursor: pointer;
        transition: all 0.15s;
      }

      .tab:hover {
        color: #005ca9;
      }

      .tab.active {
        color: #005ca9;
        border-bottom-color: #005ca9;
        font-weight: 500;
      }

      /* Content */
      .tab-content {
        padding: 24px;
      }

      .content-section {
        max-width: 900px;
      }

      /* Info Cards */
      .info-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }

      .info-card {
        background: #fff;
        border: 1px solid #e0e0e0;
        padding: 20px;
      }

      .card-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e3f2fd;
        color: #005ca9;
        margin-bottom: 12px;
      }

      .info-card h3 {
        font-size: 14px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0 0 8px 0;
      }

      .info-card p {
        font-size: 12px;
        color: #666;
        line-height: 1.5;
        margin: 0;
      }

      /* Benefícios Box */
      .beneficios-box {
        background: #fff;
        border: 1px solid #e0e0e0;
        padding: 20px;
      }

      .beneficios-box h3 {
        font-size: 14px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0 0 12px 0;
      }

      .beneficios-box ul {
        margin: 0;
        padding-left: 20px;
      }

      .beneficios-box li {
        font-size: 12px;
        color: #333;
        padding: 4px 0;
      }

      /* Article Content */
      .article-content {
        background: #fff;
        border: 1px solid #e0e0e0;
        padding: 32px;
      }

      .artigo h2 {
        font-size: 22px;
        font-weight: 600;
        color: #005ca9;
        margin: 0 0 24px 0;
        padding-bottom: 16px;
        border-bottom: 2px solid #005ca9;
      }

      .artigo h3 {
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 32px 0 16px 0;
      }

      .artigo h4 {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin: 0 0 12px 0;
      }

      .artigo p {
        font-size: 13px;
        color: #333;
        line-height: 1.7;
        margin: 0 0 16px 0;
      }

      .artigo .intro {
        font-size: 14px;
        font-style: italic;
      }

      .artigo ul,
      .artigo ol {
        margin: 0 0 16px 0;
        padding-left: 24px;
      }

      .artigo li {
        font-size: 13px;
        color: #333;
        line-height: 1.6;
        padding: 4px 0;
      }

      .pilar-box {
        background: #f8f9fa;
        border-left: 3px solid #005ca9;
        padding: 16px 20px;
        margin: 16px 0;
      }

      .atencao {
        background: #fff3cd;
        border: 1px solid #ffc107;
        padding: 12px 16px;
        margin-top: 12px;
        font-size: 12px;
      }

      .destaque-box {
        background: #e3f2fd;
        border: 1px solid #90caf9;
        padding: 20px;
        margin: 24px 0;
      }

      .destaque-box h4 {
        color: #005ca9;
        margin-bottom: 12px;
      }

      .estrategia {
        border: 1px solid #e0e0e0;
        padding: 16px 20px;
        margin: 16px 0;
      }

      .dica {
        background: #e8f5e9;
        border-left: 3px solid #4caf50;
        padding: 10px 16px;
        margin-top: 12px;
        font-size: 12px;
      }

      .aspectos-list {
        background: #fff;
        border: 1px solid #e0e0e0;
        padding: 20px 20px 20px 40px;
      }

      .planejamento-box {
        background: #005ca9;
        color: #fff;
        padding: 24px;
        margin: 32px 0;
      }

      .planejamento-box h3 {
        color: #fff;
        margin-top: 0;
      }

      .planejamento-box ol {
        margin: 0;
        padding-left: 24px;
      }

      .planejamento-box li {
        color: #fff;
      }

      .conclusao-box {
        background: #f5f5f5;
        border: 1px solid #e0e0e0;
        padding: 24px;
        margin: 32px 0 0 0;
      }

      .conclusao-box h3 {
        margin-top: 0;
      }

      .disclaimer {
        font-size: 11px;
        color: #666;
        border-top: 1px solid #e0e0e0;
        padding-top: 16px;
        margin-top: 24px;
      }

      /* Simulador */
      .simulador-intro {
        background: #fff;
        border: 1px solid #e0e0e0;
        padding: 24px;
        margin-bottom: 20px;
      }

      .simulador-intro h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 8px 0;
      }

      .simulador-intro p {
        font-size: 13px;
        color: #666;
        margin: 0 0 16px 0;
      }

      .btn-external {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: #005ca9;
        color: #fff;
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
      }

      .btn-external:hover {
        background: #004080;
      }

      .simulador-info {
        background: #fff;
        border: 1px solid #e0e0e0;
        padding: 24px;
      }

      .simulador-info h4 {
        font-size: 14px;
        font-weight: 600;
        margin: 0 0 16px 0;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 12px;
        background: #f8f9fa;
        border: 1px solid #e0e0e0;
      }

      .info-item .label {
        font-size: 12px;
        color: #666;
      }

      .info-item .value {
        font-size: 12px;
        font-weight: 600;
        color: #1a1a1a;
      }

      /* Links */
      .links-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
        margin-top: 16px;
      }

      .link-card {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: #fff;
        border: 1px solid #e0e0e0;
        text-decoration: none;
        transition: all 0.15s;
      }

      .link-card:hover {
        border-color: #005ca9;
      }

      .link-icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e3f2fd;
        color: #005ca9;
        flex-shrink: 0;
      }

      .link-icon.gov {
        background: #e8f5e9;
        color: #2e7d32;
      }

      .link-icon.caixa {
        background: #fff3e0;
        color: #f57c00;
      }

      .link-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .link-title {
        font-size: 14px;
        font-weight: 600;
        color: #1a1a1a;
      }

      .link-desc {
        font-size: 12px;
        color: #666;
      }

      h3 {
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
        margin: 0 0 16px 0;
      }

      @media (max-width: 768px) {
        .tabs {
          overflow-x: auto;
          padding: 0 16px;
        }

        .tab {
          white-space: nowrap;
          padding: 12px 16px;
        }

        .tab-content {
          padding: 16px;
        }

        .article-content {
          padding: 20px;
        }
      }
    `,
  ],
})
export class FuncefComponent {
  tabAtiva = 'visao-geral';

  constructor(private router: Router) {}

  voltar(): void {
    this.router.navigate(['/beneficios']);
  }
}
