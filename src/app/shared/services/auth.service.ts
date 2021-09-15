import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    name = "";  // user profile name, printed next to the logout button
    loginUrl = `${environment.LOGIN_URL}`;

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService
    ) { }

    login(user: any) {
        return this.http.post(this.loginUrl, JSON.stringify(user), { observe: 'response' })
    }

    // JWT is stored on the client side in local storage
    setJWT(jwt: string) {
        localStorage.setItem('jwt', jwt);
    }

    // log out by removing the JWT
    logout() {
        localStorage.removeItem('jwt');
    }

    // Check whether the token is expired and return true or false
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('jwt');
        if (token)  //check not null
        {
            this.name = this.jwtHelper.decodeToken(token).sub;  //set username
            return !this.jwtHelper.isTokenExpired(token);  //check expiration
        }

        return false;
    }


}

