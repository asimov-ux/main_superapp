import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, shareReplay, retry } from 'rxjs/operators';

// ============================================
// INTERFACES & TYPES
// ============================================

export interface Person {
  id: string;
  nome: string;
  cargo?: string;
  unidade?: string;
  ativo: boolean;
}

export interface PeopleResponse {
  items: Person[];
  total: number;
}

export interface PeopleFilters {
  searchTerm?: string;
  ativo?: boolean | null;
  cargo?: string;
  unidade?: string;
}

export type SortField = keyof Person;
export type SortOrder = 'asc' | 'desc';

// ============================================
// SERVICE
// ============================================

@Injectable({ providedIn: 'root' })
export class PeopleService {
  private readonly mockUrl = 'assets/mock/people.json';
  private peopleCache$?: Observable<PeopleResponse>;

  constructor(private http: HttpClient) {}

  // ============================================
  // MÉTODOS PRINCIPAIS
  // ============================================

  /**
   * Busca todas as pessoas (com cache)
   */
  getPeople(): Observable<PeopleResponse> {
    if (!this.peopleCache$) {
      this.peopleCache$ = this.http.get<PeopleResponse>(this.mockUrl).pipe(
        retry(2), // Retry até 2 vezes em caso de erro
        shareReplay(1), // Cache compartilhado
        catchError(this.handleError)
      );
    }
    return this.peopleCache$;
  }

  /**
   * Busca pessoa por ID
   */
  getPersonById(id: string): Observable<Person | undefined> {
    return this.getPeople().pipe(
      map((response) => response.items.find((p) => p.id === id)),
      catchError(this.handleError)
    );
  }

  /**
   * Busca pessoas com filtros
   */
  getPeopleFiltered(filters: PeopleFilters): Observable<Person[]> {
    return this.getPeople().pipe(
      map((response) => this.applyFilters(response.items, filters)),
      catchError(this.handleError)
    );
  }

  /**
   * Busca pessoas com ordenação
   */
  getPeopleSorted(
    field: SortField,
    order: SortOrder = 'asc'
  ): Observable<Person[]> {
    return this.getPeople().pipe(
      map((response) => this.sortPeople(response.items, field, order)),
      catchError(this.handleError)
    );
  }

  /**
   * Busca pessoas com filtros E ordenação
   */
  getPeopleFilteredAndSorted(
    filters: PeopleFilters,
    sortField: SortField,
    sortOrder: SortOrder = 'asc'
  ): Observable<Person[]> {
    return this.getPeople().pipe(
      map((response) => {
        let items = this.applyFilters(response.items, filters);
        items = this.sortPeople(items, sortField, sortOrder);
        return items;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Busca apenas pessoas ativas
   */
  getActivePeople(): Observable<Person[]> {
    return this.getPeopleFiltered({ ativo: true });
  }

  /**
   * Busca apenas pessoas inativas
   */
  getInactivePeople(): Observable<Person[]> {
    return this.getPeopleFiltered({ ativo: false });
  }

  /**
   * Busca por termo (nome, cargo ou unidade)
   */
  searchPeople(term: string): Observable<Person[]> {
    return this.getPeopleFiltered({ searchTerm: term });
  }

  /**
   * Estatísticas rápidas
   */
  getStats(): Observable<{
    total: number;
    ativos: number;
    inativos: number;
    porCargo: Record<string, number>;
    porUnidade: Record<string, number>;
  }> {
    return this.getPeople().pipe(
      map((response) => {
        const items = response.items;
        const ativos = items.filter((p) => p.ativo).length;
        const inativos = items.filter((p) => !p.ativo).length;

        const porCargo: Record<string, number> = {};
        const porUnidade: Record<string, number> = {};

        items.forEach((person) => {
          // Contagem por cargo
          const cargo = person.cargo || 'Sem cargo';
          porCargo[cargo] = (porCargo[cargo] || 0) + 1;

          // Contagem por unidade
          const unidade = person.unidade || 'Sem unidade';
          porUnidade[unidade] = (porUnidade[unidade] || 0) + 1;
        });

        return {
          total: items.length,
          ativos,
          inativos,
          porCargo,
          porUnidade,
        };
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Limpa o cache (força reload)
   */
  clearCache(): void {
    this.peopleCache$ = undefined;
  }

  /**
   * Valida se pessoa existe
   */
  personExists(id: string): Observable<boolean> {
    return this.getPersonById(id).pipe(
      map((person) => person !== undefined),
      catchError(() => of(false))
    );
  }

  // ============================================
  // MÉTODOS AUXILIARES (PRIVADOS)
  // ============================================

  /**
   * Aplica filtros na lista de pessoas
   */
  private applyFilters(items: Person[], filters: PeopleFilters): Person[] {
    let filtered = [...items];

    // Filtro por termo de busca (nome, cargo ou unidade)
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.nome.toLowerCase().includes(term) ||
          p.cargo?.toLowerCase().includes(term) ||
          p.unidade?.toLowerCase().includes(term)
      );
    }

    // Filtro por status (ativo/inativo)
    if (filters.ativo !== undefined && filters.ativo !== null) {
      filtered = filtered.filter((p) => p.ativo === filters.ativo);
    }

    // Filtro por cargo específico
    if (filters.cargo) {
      filtered = filtered.filter((p) => p.cargo === filters.cargo);
    }

    // Filtro por unidade específica
    if (filters.unidade) {
      filtered = filtered.filter((p) => p.unidade === filters.unidade);
    }

    return filtered;
  }

  /**
   * Ordena lista de pessoas
   */
  private sortPeople(
    items: Person[],
    field: SortField,
    order: SortOrder
  ): Person[] {
    const sorted = [...items].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      // Tratar undefined/null
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      // Comparação por tipo
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal, 'pt-BR');
      }

      if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
        return aVal === bVal ? 0 : aVal ? -1 : 1;
      }

      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    });

    return order === 'desc' ? sorted.reverse() : sorted;
  }

  /**
   * Tratamento de erros HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código: ${error.status}\nMensagem: ${error.message}`;
    }

    console.error('❌ Erro no PeopleService:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
