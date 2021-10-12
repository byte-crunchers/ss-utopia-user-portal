import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { PasswordService } from './passwordrecovery.service';
import { User } from './passwordrecovery.model';

@Component({
  selector: 'app-passwordrecovery',
  templateUrl: './passwordrecovery.component.html',
  styleUrls: ['./passwordrecovery.component.css']
})
export class PasswordrecoveryComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private passwordService: PasswordService,
  ) {}

  get f() { return this.loginForm.controls; }

  user: User[];
  showSuccess = false;
  showFailure = false;

  loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(16)]],
      email: ['', [Validators.required, Validators.maxLength(62), Validators.email]],
      zipcode:['', [Validators.required]]
  });

  ngOnInit(): void {
    this.passwordService.getUser().subscribe((res) => {
        this.user = res;
    });
  }

  onSubmit = (formValues:any) => {
    this.showSuccess = false;
    this.showFailure = false;

    if(formValues.username === this.user[0].username &&
    formValues.email === this.user[0].email &&
    formValues.zipcode === this.user[0].zipcode){
      this.showSuccess = true;
    }else{
      this.showFailure = true;
    }


  }


}
