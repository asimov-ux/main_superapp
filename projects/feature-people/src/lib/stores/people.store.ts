import { signal, computed, inject } from '@angular/core';
import { Person } from '../models/person.model';
import { PeopleApi } from '../services/people.api';
import { firstValueFrom } from 'rxjs';

export class PeopleStore {
  private api = inject(PeopleApi);

  peopleList = signal<Person[]>([]);
  total = signal<number>(0);
  query = signal({ page: 1, size: 20, search: '' });
  loading = signal(false);
  error = signal<string | null>(null);

  filtered = computed(() => this.peopleList());

  async loadPage() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const res = await firstValueFrom(this.api.fetchPeople(this.query()));
      this.peopleList.set(res.items);
      this.total.set(res.total);
    } catch (err: any) {
      this.error.set(err?.message || 'Erro ao carregar');
    } finally {
      this.loading.set(false);
    }
  }

  async getById(id: string) {
    this.loading.set(true);
    try {
      const all = await firstValueFrom(
        this.api.fetchPeople({ page: 1, size: 999 })
      );
      return all.items.find((x) => x.id === id) || null;
    } finally {
      this.loading.set(false);
    }
  }

  async update(id: string, data: Partial<Person>) {
    this.loading.set(true);
    try {
      const updated = await firstValueFrom(this.api.updatePerson(id, data));
      return updated;
    } finally {
      this.loading.set(false);
    }
  }

  setQuery(q: Partial<{ page: number; size: number; search: string }>) {
    this.query.update((curr) => ({ ...curr, ...q }));
  }
}
