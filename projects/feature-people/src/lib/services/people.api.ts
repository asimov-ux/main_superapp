import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class PeopleApi {
  constructor(private http: HttpClient) {}

  // USANDO MOCK
  fetchPeople(query: { page: number; size: number; search?: string }) {
    return this.http.get<{ items: Person[]; total: number }>(
      '/assets/mock/people.json'
    );
  }

  fetchPerson(id: string) {
    return this.http.get<Person>(`/assets/mock/people-by-id/${id}.json`);
  }

  updatePerson(id: string, data: Partial<Person>) {
    console.warn('Mock: update ignorado', id, data);
    return this.http.get<Person>(`/assets/mock/people.json`);
  }

  uploadDocument(id: string, file: File) {
    console.warn('Mock upload (não implementado)');
    return this.http.get(`/assets/mock/people.json`);
  }
}
