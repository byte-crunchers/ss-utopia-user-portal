import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cardsignup',
    templateUrl: './cardsignup.component.html',
    styleUrls: ['./cardsignup.component.css']
})
export class CardSignupComponent implements OnInit {

    constructor(
        private httpService: HttpService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        public router: Router
    ) { }

    cards: any;
    images = ["red_card.png", "orange_card.png", "plat_card.png", "blue_card.png", "white_card.png"];
    cardType = 0;
    card: any;  //currently selected card

    //define validators for each field
    signupForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(10)]],
    });

    //display error message if the field has been touched & fails validator checks
    isInvalid(field: string): boolean {
        let x = this.signupForm.get(field);
        if (x && x.invalid && (x.dirty || x.touched))
            return true;
        return false;
    }

    ngOnInit(): void {
        this.card = {};

        //get choice from querystring
        this.route.queryParams.subscribe(params => {
            this.cardType = params['type'];
            if (this.cardType == null)
                this.cardType = 1;
            this.cards = [];
            this.loadAllCards();
        });
    }

    loadAllCards() {
        this.httpService.getAll(`${environment.BASE_PAI_URL}${environment.CARDS_GET_URL}`).subscribe((res) => {
            this.cards = res;
            this.card = this.cards[this.cardType];
        })
    }

    //submit form
    onSubmit = (fields: any) => {
        console.log('Card signup form submitted.');
        this.router.navigateByUrl('/cards/approved');
    };

    //enable submit button when all fields are valid
    enableSubmit(): boolean {
        // return true;
        return this.signupForm.valid;
    }
}
