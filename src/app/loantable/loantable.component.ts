import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validator, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-loantable',
    templateUrl: './loantable.component.html',
    styleUrls: ['./loantable.component.css']
})
export class LoanTableComponent implements OnInit {

    constructor(
        private httpService: HttpService,
        private modalService: NgbModal,
        private fb: FormBuilder
    ) { }
    loans: any;
    totalLoans = 0;
    today = new Date();

    ngOnInit(): void {
        this.loadAllLoans();
    }

    loadAllLoans() {
        this.httpService.getAll(`${environment.BASE_PAI_URL}${environment.LOANS_GET_URL}`).subscribe((res) => {
            this.loans = res;
            this.totalLoans = this.loans.length;
        })
    }

}
