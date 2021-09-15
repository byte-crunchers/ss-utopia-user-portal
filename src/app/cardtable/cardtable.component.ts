import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-cardtable',
    templateUrl: './cardtable.component.html',
    styleUrls: ['./cardtable.component.css']
})
export class CardTableComponent implements OnInit {

    constructor(
        private httpService: HttpService
    ) { }
    cards: any;
    totalCards = 0;
    today = new Date();

    ngOnInit(): void {
        this.loadAllCards();
    }

    loadAllCards() {
        this.httpService.getAll(`${environment.BASE_PAI_URL}${environment.CARDS_GET_URL}`).subscribe((res) => {
            this.cards = res;
            this.totalCards = this.cards.length;
        })
    }

}
