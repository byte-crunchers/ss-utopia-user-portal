import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

    constructor(
        private httpService: HttpService,
        private modalService: NgbModal,
    ) { }

    cards: any;
    modalHeader = "";
    modalImage = "";
    modalInfo: any;
    images = ["basic_credit.png", "platinum_credit.png", "plus_credit.png", "foodies_credit.png", "utopia_debit.png"];
    index = [0, 1, 2, 3, 4];  //display order

    //modal variables
    modalRef!: NgbModalRef;
    errMsg: any;
    closeResult: any;

    ngOnInit(): void {
        //init blank values
        this.cards = new Array(this.index.length);
        for(let i=0; i<this.images.length; i++)
            this.cards[i] = {};

        this.loadAllCards();
    }

    loadAllCards() {
        this.httpService.getAll(`${environment.CARD_TYPES_URL}`).subscribe((res) => {
            this.cards = res;
        });
    }

    closeModal() {
        this.modalRef.close();
    }

    openModal(content: any, i: any) {
        this.modalHeader = this.cards[i].id;
        this.modalImage = this.images[i];

        this.modalInfo = [];
        this.modalInfo[0] = this.cards[i].annual_fee;
        this.modalInfo[1] = this.cards[i].cashBack;
        this.modalInfo[2] = this.cards[i].foodie_pts;
        this.modalInfo[3] = this.cards[i].late_fee;

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
