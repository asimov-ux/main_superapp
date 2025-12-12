import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import {
  Beneficio,
  BeneficioCategoria,
  SolicitacaoBeneficio,
  CriarSolicitacaoBeneficioDTO,
} from '../models/beneficio.model';

/**
 * Serviço de gerenciamento de Benefícios
 * Implementa mock de API REST para desenvolvimento
 */
@Injectable({
  providedIn: 'root',
})
export class BeneficiosService {
  private mockBeneficios: Beneficio[] = [
    {
      id: 'ben-001',
      nome: 'Plano de Saúde',
      descricao:
        'Plano de saúde completo com cobertura nacional e rede credenciada ampla',
      categoria: 'saude',
      status: 'ativo',
      valorMensal: 450.0,
      valorAnual: 5400.0,
      icone: 'health',
      elegibilidade: [
        'Colaborador efetivo',
        'Mínimo 3 meses de empresa',
        'Carga horária mínima 30h/semana',
      ],
      documentosNecessarios: [
        'CPF',
        'RG',
        'Comprovante de residência',
        'Declaração de dependentes (se aplicável)',
      ],
      prazoAnalise: 5,
      dataInicio: new Date('2024-01-01'),
      detalhes:
        'O plano de saúde oferece cobertura para consultas, exames, internações e cirurgias. Inclui cobertura odontológica básica. Coparticipação de 30% em consultas e exames.',
      linkRegulamento: 'https://exemplo.com/regulamento-saude.pdf',
    },
    {
      id: 'ben-002',
      nome: 'Vale Alimentação',
      descricao:
        'Cartão alimentação para compras em supermercados e mercearias',
      categoria: 'alimentacao',
      status: 'ativo',
      valorMensal: 600.0,
      valorAnual: 7200.0,
      icone: 'restaurant',
      elegibilidade: ['Todos os colaboradores'],
      documentosNecessarios: ['CPF', 'Dados bancários'],
      prazoAnalise: 2,
      dataInicio: new Date('2024-01-01'),
      detalhes:
        'Valor mensal de R$ 600,00 creditado no cartão alimentação. Aceito em rede ampla de estabelecimentos. Sem taxa de manutenção.',
    },
    {
      id: 'ben-003',
      nome: 'Vale Transporte',
      descricao: 'Auxílio para deslocamento casa-trabalho',
      categoria: 'transporte',
      status: 'ativo',
      valorMensal: 220.0,
      valorAnual: 2640.0,
      icone: 'directions_bus',
      elegibilidade: ['Colaboradores que utilizam transporte público'],
      documentosNecessarios: [
        'Comprovante de residência',
        'Declaração de necessidade',
      ],
      prazoAnalise: 3,
      dataInicio: new Date('2024-01-01'),
      detalhes:
        'Desconto de 6% no salário. Cobertura para trajeto residência-trabalho-residência. Cartão de transporte integrado.',
    },
    {
      id: 'ben-004',
      nome: 'Auxílio Educação',
      descricao: 'Bolsa para cursos de graduação e pós-graduação',
      categoria: 'educacao',
      status: 'ativo',
      valorMensal: 800.0,
      valorAnual: 9600.0,
      icone: 'school',
      elegibilidade: [
        'Colaborador efetivo',
        'Mínimo 1 ano de empresa',
        'Curso relacionado à área de atuação',
      ],
      documentosNecessarios: [
        'Comprovante de matrícula',
        'Grade curricular',
        'Carta de intenções',
        'Histórico acadêmico',
      ],
      prazoAnalise: 10,
      dataInicio: new Date('2024-01-01'),
      detalhes:
        'Reembolso de até 80% das mensalidades. Máximo de R$ 800,00 mensais. Compromisso de permanência de 2 anos após conclusão do curso.',
      linkRegulamento: 'https://exemplo.com/regulamento-educacao.pdf',
    },
    {
      id: 'ben-005',
      nome: 'Previdência Complementar',
      descricao: 'Plano de previdência privada com contribuição da empresa',
      categoria: 'previdencia',
      status: 'ativo',
      valorMensal: 500.0,
      valorAnual: 6000.0,
      icone: 'savings',
      elegibilidade: [
        'Colaborador efetivo',
        'Mínimo 2 anos de empresa',
        'Idade entre 25 e 55 anos',
      ],
      documentosNecessarios: [
        'CPF',
        'RG',
        'Comprovante de renda',
        'Declaração de beneficiários',
      ],
      prazoAnalise: 7,
      dataInicio: new Date('2024-01-01'),
      detalhes:
        'Contribuição paritária: empresa contribui com mesmo valor do colaborador (até R$ 500,00). Gestão por instituição financeira certificada. Resgate disponível após 60 meses.',
      linkRegulamento: 'https://exemplo.com/regulamento-previdencia.pdf',
    },
    {
      id: 'ben-006',
      nome: 'Gympass',
      descricao: 'Acesso a rede de academias e atividades físicas',
      categoria: 'lazer',
      status: 'ativo',
      valorMensal: 120.0,
      valorAnual: 1440.0,
      icone: 'fitness_center',
      elegibilidade: ['Todos os colaboradores'],
      documentosNecessarios: ['CPF', 'E-mail corporativo'],
      prazoAnalise: 1,
      dataInicio: new Date('2024-01-01'),
      detalhes:
        'Acesso a mais de 50.000 academias parceiras. Plano Smart com até 3 check-ins mensais. Aplicativo com aulas online e treinos personalizados.',
    },
  ];

  private mockSolicitacoes: SolicitacaoBeneficio[] = [
    {
      id: 'sol-001',
      beneficioId: 'ben-001',
      beneficioNome: 'Plano de Saúde',
      colaboradorId: 'user-001',
      colaboradorNome: 'João Silva',
      dataSolicitacao: new Date('2024-11-15'),
      status: 'aprovada',
      documentosEnviados: [
        {
          id: 'doc-001',
          tipo: 'CPF',
          nome: 'cpf-joao.pdf',
          url: '/mock/docs/cpf-joao.pdf',
          dataEnvio: new Date('2024-11-15'),
        },
      ],
      dataAprovacao: new Date('2024-11-20'),
      dataInicio: new Date('2024-12-01'),
    },
  ];

  constructor() {}

  /**
   * Lista todos os benefícios disponíveis
   * @param categoria Filtro opcional por categoria
   * @returns Observable com array de benefícios
   */
  getBeneficios(categoria?: BeneficioCategoria): Observable<Beneficio[]> {
    let resultado = [...this.mockBeneficios];

    if (categoria) {
      resultado = resultado.filter((b) => b.categoria === categoria);
    }

    // Simula delay de API
    return of(resultado).pipe(delay(300));
  }

  /**
   * Busca benefício por ID
   * @param id ID do benefício
   * @returns Observable com benefício ou erro 404
   */
  getBeneficioById(id: string): Observable<Beneficio> {
    const beneficio = this.mockBeneficios.find((b) => b.id === id);

    if (!beneficio) {
      return throwError(() => ({
        status: 404,
        message: 'Benefício não encontrado',
      })).pipe(delay(200));
    }

    return of(beneficio).pipe(delay(200));
  }

  /**
   * Lista solicitações do colaborador
   * @param colaboradorId ID do colaborador
   * @returns Observable com array de solicitações
   */
  getSolicitacoesColaborador(
    colaboradorId: string
  ): Observable<SolicitacaoBeneficio[]> {
    const solicitacoes = this.mockSolicitacoes.filter(
      (s) => s.colaboradorId === colaboradorId
    );

    return of(solicitacoes).pipe(delay(300));
  }

  /**
   * Cria nova solicitação de benefício
   * @param dto Dados da solicitação
   * @returns Observable com solicitação criada
   */
  criarSolicitacao(
    dto: CriarSolicitacaoBeneficioDTO
  ): Observable<SolicitacaoBeneficio> {
    const beneficio = this.mockBeneficios.find((b) => b.id === dto.beneficioId);

    if (!beneficio) {
      return throwError(() => ({
        status: 404,
        message: 'Benefício não encontrado',
      })).pipe(delay(200));
    }

    const novaSolicitacao: SolicitacaoBeneficio = {
      id: `sol-${Date.now()}`,
      beneficioId: dto.beneficioId,
      beneficioNome: beneficio.nome,
      colaboradorId: dto.colaboradorId,
      colaboradorNome: 'Colaborador Mock', // Em produção, buscar do serviço de auth
      dataSolicitacao: new Date(),
      status: 'pendente',
      documentosEnviados: [],
      observacoes: dto.observacoes,
    };

    this.mockSolicitacoes.push(novaSolicitacao);

    return of(novaSolicitacao).pipe(delay(500));
  }

  /**
   * Cancela solicitação pendente
   * @param solicitacaoId ID da solicitação
   * @returns Observable com resultado da operação
   */
  cancelarSolicitacao(solicitacaoId: string): Observable<{ success: boolean }> {
    const solicitacao = this.mockSolicitacoes.find(
      (s) => s.id === solicitacaoId
    );

    if (!solicitacao) {
      return throwError(() => ({
        status: 404,
        message: 'Solicitação não encontrada',
      })).pipe(delay(200));
    }

    if (
      solicitacao.status !== 'pendente' &&
      solicitacao.status !== 'em_analise'
    ) {
      return throwError(() => ({
        status: 400,
        message:
          'Apenas solicitações pendentes ou em análise podem ser canceladas',
      })).pipe(delay(200));
    }

    solicitacao.status = 'cancelada';

    return of({ success: true }).pipe(delay(300));
  }

  /**
   * Busca categorias disponíveis
   * @returns Array com categorias e contadores
   */
  getCategorias(): Observable<
    { categoria: BeneficioCategoria; nome: string; total: number }[]
  > {
    const categorias: {
      categoria: BeneficioCategoria;
      nome: string;
      total: number;
    }[] = [
      {
        categoria: 'saude',
        nome: 'Saúde',
        total: this.mockBeneficios.filter((b) => b.categoria === 'saude')
          .length,
      },
      {
        categoria: 'educacao',
        nome: 'Educação',
        total: this.mockBeneficios.filter((b) => b.categoria === 'educacao')
          .length,
      },
      {
        categoria: 'transporte',
        nome: 'Transporte',
        total: this.mockBeneficios.filter((b) => b.categoria === 'transporte')
          .length,
      },
      {
        categoria: 'alimentacao',
        nome: 'Alimentação',
        total: this.mockBeneficios.filter((b) => b.categoria === 'alimentacao')
          .length,
      },
      {
        categoria: 'previdencia',
        nome: 'Previdência',
        total: this.mockBeneficios.filter((b) => b.categoria === 'previdencia')
          .length,
      },
      {
        categoria: 'lazer',
        nome: 'Lazer',
        total: this.mockBeneficios.filter((b) => b.categoria === 'lazer')
          .length,
      },
    ];

    return of(categorias).pipe(delay(200));
  }
}
