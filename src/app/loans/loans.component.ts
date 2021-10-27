import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-loans',
    templateUrl: './loans.component.html',
    styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

    constructor(
        private httpService: HttpService,
        private modalService: NgbModal,
    ) { }
    loans: any;
    modalHeader = "";
    modalImage = "";
    modalInfo: any;
    images = ["mortgage.jpg", "auto_loan.jpg", "student_loan.jpg", "personal_loan.jpg", "payday_loan.jpg"];
    index = [0, 1, 2, 3, 4];  //display order

    //modal variables
    modalRef!: NgbModalRef;
    errMsg: any;
    closeResult: any;

    ngOnInit(): void {
        //init blank values
        this.loans = new Array(this.index.length);
        for(let i=0; i<this.images.length; i++)
            this.loans[i] = {};

        this.loadAllLoans();
    }

    loadAllLoans() {
        this.httpService.getAll(`${environment.LOAN_TYPES_URL}`).subscribe((res) => {
            this.loans = res;
        });
    }

    closeModal() {
        this.modalRef.close();
    }

    openModal(content: any, i: any) {
        this.modalHeader = this.loans[i].id;
        this.modalImage = this.images[i];

        this.modalInfo = [];
        this.modalInfo[0] = this.loans[i].upperRange;
        this.modalInfo[1] = this.loans[i].lowerRange;
        this.modalInfo[2] = this.loans[i].termMax;
        this.modalInfo[3] = this.loans[i].termMin;
        this.modalInfo[4] = this.loans[i].lateFee;
        this.modalInfo[5] = this.loans[i].secured;

        this.modalRef = this.modalService.open(content);
        this.modalRef.result.then(
            (result) => {
                this.errMsg = '';
            },
            (reason) => {
                this.errMsg = 'Unable to serivce';
            }
        );
    }
}
