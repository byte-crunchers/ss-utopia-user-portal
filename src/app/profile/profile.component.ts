import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
import { ProfileService } from './profile.service';
import { User } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
  ) {}

  get f() { return this.profileForm.controls; }

  user: User[];
  showUpdate = false;

  profileForm = this.formBuilder.group({
    email: ['', [Validators.maxLength(62), Validators.email]],
    street: ['', [Validators.maxLength(35)]],
    city: ['', [Validators.maxLength(16)]],
    state: ['', [Validators.maxLength(2)]],
    zipcode: ['', [Validators.minLength(5), Validators.maxLength(5)]],
    password: ['', [
      Validators.minLength(6),
      Validators.maxLength(16),
      Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]+$")
    ]]
  });

  ngOnInit(): void {
    this.profileService.getUser().subscribe((res) => {
        this.user = res;
    });
  }

  showUpdateForm (){
    if(this.showUpdate === false){
      this.showUpdate = true;
    } else {
      this.showUpdate = false;
    }

  }

  onSubmit = (formValues:any) => {
    if(this.showUpdate === true){
      this.showUpdate = false;
    } else {
      this.showUpdate = true;
    }

    if(formValues.email != ''){
      this.user[0].email = formValues.email;
    }
    if(formValues.street != ''){
      this.user[0].street = formValues.street;
    }
    if(formValues.city != ''){
      this.user[0].city = formValues.city;
    }
    if(formValues.state != ''){
      this.user[0].state = formValues.state;
    }
    if(formValues.zipcode != ''){
      this.user[0].zipcode = formValues.zipcode;
    }
  }

}
