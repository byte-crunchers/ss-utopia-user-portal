import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    data: any;
    loginAttempts = 0;
    showLink2 = false;

    loginForm = this.formBuilder.group({
        username: '',
        password: ''
    });

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    onSubmit = (user: any) => {
        console.log("Login attempt: " + user.username + ", " + user.password);

        this.authService.login(user).subscribe(
            (response: any) => {
                console.log("Successfully logged in!");
                const jwt = response.headers.get('Authorization').substring(7);
                console.log(jwt);
                this.loginAttempts = 0;
                this.authService.setJWT(jwt);
                this.router.navigateByUrl('/');
            }, error => {
                console.log("Login failed - Status " + error.status);
                if(error.status == 0){  //self-signed certificate blocked
                    this.showLink2 = true;
                }
                else{  //401 unauthorized
                    this.loginForm.reset();
                    this.loginAttempts++;
                    this.showLink2 = false;
                }
            }
        );

    }

    ngOnInit(): void {
    }

}
