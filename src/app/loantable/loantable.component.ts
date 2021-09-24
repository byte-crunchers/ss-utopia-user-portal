import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-loantable',
    templateUrl: './loantable.component.html',
    styleUrls: ['./loantable.component.css']
})
export class LoanTableComponent implements OnInit {

    constructor(
        private httpService: HttpService
    ) { }
    loans: any;
    totalLoans = 0;
    today = new Date();

    ngOnInit(): void {
        this.loadAllLoans();
    }

    loadAllLoans() {
        this.httpService.getAll(`${environment.LOANS_URL}`).subscribe((res) => {
            this.loans = res;
            this.totalLoans = this.loans.length;
        })
    }

}
