import { Injectable } from "@angular/core";
import { PeopleStore } from "../stores/people.store";

@Injectable({ providedIn: "root" })
export class PeopleService {
  constructor(private store: PeopleStore) {}

  loadPage() {
    return this.store.loadPage();
  }

  setQuery(q: any) {
    this.store.setQuery(q);
  }

  getStore() {
    return this.store;
  }
}
