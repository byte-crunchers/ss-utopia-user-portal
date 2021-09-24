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
    cardTypeId = 0;
    card: any;  //currently selected card
    showSpinner = false;

    //define form field validators
    signupForm = this.fb.group({
        cardType: [''],  //hidden field for POST
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address: ['', Validators.required],
        address2: [''],  //optional field
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
        email: ['', [Validators.required, Validators.pattern(/^.+@.+\..+$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^(\()?\d{3}(\))?[\s-]?\d{3}[\s-]?\d{4}$/)]],
    });

    //display error message if the field has been touched & fails validator checks
    showError(field: string): boolean {
        let x = this.signupForm.get(field);
        if (x && x.invalid && (x.dirty || x.touched))
            return true;
        return false;
    }

    ngOnInit(): void {
        this.card = {};

        //get choice from querystring
        this.route.queryParams.subscribe(params => {
            this.cardTypeId = params['type'];
            if (this.cardTypeId == null)
                this.cardTypeId = 1;
            this.cards = [];
            this.loadAllCards();
        });
    }

    loadAllCards() {
        this.httpService.getAll(`${environment.CARDS_URL}`).subscribe((res) => {
            this.cards = res;
            this.card = this.cards[this.cardTypeId];
            this.signupForm.patchValue({ cardType: this.card.cardName });
        });
    }

    //submit form
    onSubmit = (fields: any) => {
        console.log('Submitting card signup form...');
        this.showSpinner = true;

        this.httpService.postForm(`${environment.CARDS_URL}` + '/form', fields).subscribe(
            (response: any) => {
                console.log("Form saved successfully!");
                this.router.navigateByUrl('/cards/approved');
            }, error => {
                console.log("Form submit failed - Status " + error.status);
            }
        );
    };

    //enable submit button when all fields are valid
    enableSubmit(): boolean {
        // return true;
        return this.signupForm.valid;
    }
}
