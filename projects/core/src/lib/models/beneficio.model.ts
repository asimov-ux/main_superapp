export interface Beneficio {
  id: number;
  nome: string;
  descricao: string;
  categoria: 'Saúde' | 'Alimentação' | 'Seguro' | 'Previdência' | 'Outros';
  valor?: number;
  ativo: boolean;
  dataInicio?: Date;
}
