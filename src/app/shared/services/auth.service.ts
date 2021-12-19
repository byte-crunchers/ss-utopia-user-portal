import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

/* handles user authentication using JWT
*/

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loginUrl = `${environment.AUTH_URL}`;
    name = "";  // user profile name, printed in website header
    userId = -1;  //user id for API calls

    constructor(
        private http: HttpClient,
        private jwtHelper: JwtHelperService
    ) { }

    login(user: any) {
        return this.http.post(
            this.loginUrl,
            JSON.stringify(user),
            {
                observe: 'response'
            }
        );
    }

    // JWT is stored on the client side in local storage
    setJWT(jwt: string) {
        localStorage.setItem('jwt', jwt);
    }

    // log out by deleting the JWT
    logout() {
        localStorage.removeItem('jwt');
    }

    // Check whether the token is expired and return true or false
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('jwt');
        if (token)  //check not null
        {
            this.name = this.jwtHelper.decodeToken(token).sub;  //set username
            this.userId = this.jwtHelper.decodeToken(token).id;  //set user id
            return !this.jwtHelper.isTokenExpired(token);  //check expiration
        }

        return false;
    }


}

