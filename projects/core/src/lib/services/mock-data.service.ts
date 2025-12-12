import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { Pessoa } from '../models/pessoa.model';
import { Beneficio } from '../models/beneficio.model';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private pessoas: Pessoa[] = [
    {
      id: 1,
      nome: 'João Silva',
      cargo: 'Analista',
      departamento: 'Agência Central',
      ativo: true,
      email: 'joao.silva@caixa.gov.br',
      telefone: '(61) 98765-4321',
      dataCadastro: new Date('2020-01-15'),
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      cargo: 'Gerente',
      departamento: 'Superintendência',
      ativo: true,
      email: 'maria.oliveira@caixa.gov.br',
      telefone: '(61) 98765-1234',
      dataCadastro: new Date('2018-03-22'),
    },
    {
      id: 3,
      nome: 'Carlos Santos',
      cargo: 'Coordenador',
      departamento: 'Filial Norte',
      ativo: true,
      email: 'carlos.santos@caixa.gov.br',
      telefone: '(85) 98765-5678',
      dataCadastro: new Date('2019-07-10'),
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cargo: 'Assistente',
      departamento: 'Agência Sul',
      ativo: false,
      email: 'ana.costa@caixa.gov.br',
      telefone: '(51) 98765-8765',
      dataCadastro: new Date('2021-11-05'),
    },
  ];

  private beneficios: Beneficio[] = [
    {
      id: 1,
      nome: 'Plano de Saúde',
      descricao: 'Cobertura nacional',
      categoria: 'Saúde',
      valor: 450,
      ativo: true,
      dataInicio: new Date('2020-01-01'),
    },
    {
      id: 2,
      nome: 'Vale Alimentação',
      descricao: 'R$ 600/mês',
      categoria: 'Alimentação',
      valor: 600,
      ativo: true,
      dataInicio: new Date('2020-01-01'),
    },
    {
      id: 3,
      nome: 'Seguro de Vida',
      descricao: 'Cobertura familiar',
      categoria: 'Seguro',
      ativo: true,
      dataInicio: new Date('2020-01-01'),
    },
    {
      id: 4,
      nome: 'Previdência Privada',
      descricao: 'PGBL patrocinado',
      categoria: 'Previdência',
      ativo: true,
      dataInicio: new Date('2020-01-01'),
    },
  ];

  getPessoas(): Observable<Pessoa[]> {
    console.log('📊 Buscando pessoas...');
    return of(this.pessoas).pipe(delay(300));
  }

  getPessoaById(id: number): Observable<Pessoa | undefined> {
    const pessoa = this.pessoas.find((p) => p.id === id);
    if (!pessoa) {
      return throwError(() => new Error(`Pessoa #${id} não encontrada`));
    }
    return of(pessoa).pipe(delay(200));
  }

  getBeneficios(): Observable<Beneficio[]> {
    console.log('📊 Buscando benefícios...');
    return of(this.beneficios).pipe(delay(300));
  }

  getBeneficioById(id: number): Observable<Beneficio | undefined> {
    const beneficio = this.beneficios.find((b) => b.id === id);
    if (!beneficio) {
      return throwError(() => new Error(`Benefício #${id} não encontrado`));
    }
    return of(beneficio).pipe(delay(200));
  }
}
