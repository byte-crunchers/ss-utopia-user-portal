import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        public authService: AuthService,
        public router: Router
    ) { }

    logout(): void {
        this.authService.logout();
        console.log('Logged out - JWT deleted.');
        this.router.navigateByUrl('/login');
    }

    ngOnInit(): void {
    }

}
