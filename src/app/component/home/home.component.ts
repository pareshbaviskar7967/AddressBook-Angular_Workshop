import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/model/person';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public personDetails: Person[] = [];

  constructor(
    private httpService: HttpService,
    private router: Router,
    public dataService: DataService
  ) {}

  ngOnInit(): void {
    this.httpService.getPersonData().subscribe(Response => {
      this.personDetails = Response.data;
    });
  }

  remove(personId: number) {
    this.httpService.deletePersonData(personId).subscribe((data) => {
      console.log(data);
      this.ngOnInit();
    });
  }

  update(person: Person): void {
    this.dataService.changePerson(person);
    this.router.navigateByUrl('/add/' + person.personId);
  }
}
