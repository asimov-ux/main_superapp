/**
 * Modelo de Benefício
 * Representa os benefícios disponíveis para colaboradores da Caixa
 */

export type BeneficioCategoria =
  | 'saude'
  | 'educacao'
  | 'transporte'
  | 'alimentacao'
  | 'previdencia'
  | 'lazer';

export type BeneficioStatus = 'ativo' | 'inativo' | 'em_analise' | 'suspenso';

export type SolicitacaoStatus =
  | 'pendente'
  | 'em_analise'
  | 'aprovada'
  | 'reprovada'
  | 'cancelada';

/**
 * Interface principal do Benefício
 */
export interface Beneficio {
  id: string;
  nome: string;
  descricao: string;
  categoria: BeneficioCategoria;
  status: BeneficioStatus;
  valorMensal?: number;
  valorAnual?: number;
  icone: string;
  elegibilidade: string[];
  documentosNecessarios: string[];
  prazoAnalise: number; // em dias
  dataInicio: Date;
  dataFim?: Date;
  detalhes: string;
  linkRegulamento?: string;
}

/**
 * Interface de Solicitação de Benefício
 */
export interface SolicitacaoBeneficio {
  id: string;
  beneficioId: string;
  beneficioNome: string;
  colaboradorId: string;
  colaboradorNome: string;
  dataSolicitacao: Date;
  status: SolicitacaoStatus;
  documentosEnviados: DocumentoBeneficio[];
  observacoes?: string;
  dataAprovacao?: Date;
  dataInicio?: Date;
  motivoReprovacao?: string;
}

/**
 * Interface de Documento anexado à solicitação
 */
export interface DocumentoBeneficio {
  id: string;
  tipo: string;
  nome: string;
  url: string;
  dataEnvio: Date;
}

/**
 * DTO para criação de solicitação
 */
export interface CriarSolicitacaoBeneficioDTO {
  beneficioId: string;
  colaboradorId: string;
  documentos?: File[];
  observacoes?: string;
}
