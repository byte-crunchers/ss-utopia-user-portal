import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-card-status',
    templateUrl: './card-status.component.html',
    styleUrls: ['./card-status.component.css']
})
export class CardStatusComponent implements OnInit {

    constructor(
        public authService: AuthService,
        private httpService: HttpService,
    ) { }

    cards: any;
    totalCards = 0;
    today = new Date();

    ngOnInit(): void {
        this.loadAllCards();
    }

    //get cards by user ID
    loadAllCards() {
        this.httpService.getAll(`${environment.CARDS_URL}` + '/credit/' + this.authService.userId).subscribe((res) => {
            this.cards = res;
            this.totalCards = this.cards.length;
            this.setStatuses();
        })
    }
    
    //set values that are calculated on the front end
    setStatuses() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].index = i;
            
            //set status text & icon
            if (!this.cards[i].approved){
                this.cards[i].statusTxt = "Awaiting approval";
                this.cards[i].icon = -1;
            }
            else if (!this.cards[i].confirmed){
                this.cards[i].statusTxt = "Awaiting confirmation";
                this.cards[i].icon = -1;
            }
            else if (!this.cards[i].active){
                this.cards[i].statusTxt = "Deactivated";
                this.cards[i].icon = -2;
            }
            else{
                this.cards[i].statusTxt = "Active";

                if(this.cards[i].paymentDue > 0)
                    this.cards[i].icon = 1;
                else
                    this.cards[i].icon = 0;
            }
            
        }

    }

    //enable pay button only when status is active
    enablePay(i: any): boolean {
        return this.cards[i].statusTxt == "Active";
    }

}
