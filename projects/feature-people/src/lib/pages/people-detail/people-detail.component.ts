import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from '../../services/people.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'fp-people-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss'],
})
export class PeopleDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private peopleService = inject(PeopleService);
  person: any;
  form = inject(FormBuilder).nonNullable.group({
    nome: [''],
    email: [''],
    telefone: [''],
  });

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.person = await this.peopleService.getStore().getById(id);
      this.form.patchValue(this.person || {});
    }
  }

  async save() {
    const id = this.person?.id;
    if (id) {
      await this.peopleService.getStore().update(id, this.form.value);
      alert('Salvo');
    }
  }
}
