import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

/* prevents user from accessing routes when not logged in
*/

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        public auth: AuthService,
        public router: Router
    ) { }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigateByUrl('/login');
            console.log('Unauthorized user - redirect to login page.');
            return false;
        }
        return true;
    }
}
