export interface Person {
  id: string;
  nome: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  nascimento?: string; // ISO date
  cargo?: string;
  unidade?: string;
  ativo: boolean;
  dependencia?: { id: string; nome: string }[];
  documentos?: Array<{ tipo: string; url: string }>;
  lastUpdated?: string;
}
