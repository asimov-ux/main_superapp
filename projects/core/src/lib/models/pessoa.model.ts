export interface Pessoa {
  id: number;
  nome: string;
  cargo: string;
  departamento: string;
  ativo: boolean;
  email?: string;
  telefone?: string;
  dataCadastro?: Date;
}
