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
    images = ["red_card.png", "orange_card.png", "plat_card.png", "blue_card.png", "white_card.png"];

    //modal variables
    modalRef!: NgbModalRef;
    errMsg: any;
    closeResult: any;

    ngOnInit(): void {
        this.cards = [];
        this.cards[0] = {};
        this.cards[1] = {};
        this.cards[2] = {};
        this.cards[3] = {};
        this.cards[4] = {};
        this.loadAllCards();
    }

    loadAllCards() {
        this.httpService.getAll(`${environment.BASE_PAI_URL}${environment.CARDS_GET_URL}`).subscribe((res) => {
            this.cards = res;
        })
    }

    closeModal() {
        this.modalRef.close();
    }

    openModal(content: any, i: any) {
        this.modalHeader = this.cards[i].cardName;
        this.modalImage = this.images[i];

        this.modalInfo = [];
        this.modalInfo[0] = this.cards[i].annualFee;
        this.modalInfo[1] = this.cards[i].apr;
        this.modalInfo[2] = this.cards[i].cashBack;
        this.modalInfo[3] = this.cards[i].foodiesPointsPercentages;
        this.modalInfo[4] = this.cards[i].lateFee;

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
