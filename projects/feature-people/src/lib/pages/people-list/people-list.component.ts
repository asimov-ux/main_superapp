import { Component, OnInit, inject } from "@angular/core";
import { PeopleService } from "../../services/people.service";
import { PeopleStore } from "../../stores/people.store";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: "fp-people-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./people-list.component.html",
  styleUrls: ["./people-list.component.scss"]
})
export class PeopleListComponent implements OnInit {
  private peopleService = inject(PeopleService);
  store = inject(PeopleStore);

  ngOnInit() {
    this.peopleService.loadPage();
  }

  goDetail(id: string) {
    location.href = `/people/${id}`;
  }
}
