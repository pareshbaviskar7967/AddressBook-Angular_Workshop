import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/model/person';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public person: Person = new Person();
  public personFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private dataService: DataService,
    private activatedRouter: ActivatedRoute
  ) {

    this.personFormGroup = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{1}[a-zA-Zs]{2,}$'),
      ]),
      address: new FormControl('', Validators.required),
      city: new FormControl(''),
      state: new FormControl(''),
      email: new FormControl('', Validators.required),
      zipcode: new FormControl('', Validators.required),
      contactno: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.activatedRouter.snapshot.params['personId'] != undefined) {
      this.dataService.currentPerson.subscribe((person) => {
        if (Object.keys(person).length !== 0) {
          this.personFormGroup.get('name')?.setValue(person.name);
          this.personFormGroup.patchValue({ address: person.address });
          this.personFormGroup.patchValue({ city: person.city });
          this.personFormGroup.get('state')?.setValue(person.state);
          this.personFormGroup.patchValue({ email: person.email });
          this.personFormGroup.get('zipcode')?.setValue(person.zipcode);
          this.personFormGroup.patchValue({ contactno: person.contactno });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.activatedRouter.snapshot.params['personId'] != undefined) {
      this.httpService
        .updatePersonData(
          this.activatedRouter.snapshot.params['personId'],
          this.personFormGroup.value
        )
        .subscribe((Response) => {
          this.router.navigateByUrl('/home');
        });
    } else {
      this.person = this.personFormGroup.value;
      this.httpService.addPersonData(this.person).subscribe((response) => {
        console.log(this.person);
        this.router.navigateByUrl('/home');
      });
    }
  }
}
