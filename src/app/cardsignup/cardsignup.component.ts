import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhonePipe } from '../shared/custom/phone.pipe';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-cardsignup',
    templateUrl: './cardsignup.component.html',
    styleUrls: ['./cardsignup.component.css']
})
export class CardSignupComponent implements OnInit {

    constructor(
        public authService: AuthService,
        private httpService: HttpService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        public router: Router,
        private phonePipe: PhonePipe
    ) { }

    user: any;  //user info
    cards: any;
    cardImage = "blank_card.png";
    cardTypeId = 0;
    card: any;  //currently selected card
    showSpinner = false;

    //define form field validators
    signupForm = this.fb.group({
        userId: [''],  //hidden field
        cardType: [''],  //hidden field
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
        this.user = {};

        this.loadUserInfo();

        //get choice from querystring
        this.route.queryParams.subscribe(params => {
            this.cardTypeId = params['type'];
            if (this.cardTypeId == null)
                this.cardTypeId = 1;
            this.cards = [];
            this.loadAllCards();
        });

        //auto format phone number
        this.signupForm.valueChanges.subscribe(val => {
            if (typeof val.phone === 'string') {
                const maskedVal = this.phonePipe.transform(val.phone, 'US');
                if (val.phone !== maskedVal) {
                    this.signupForm.patchValue({ phone: maskedVal });
                }
            }
        });
    }

    loadAllCards() {
        this.httpService.getAll(`${environment.CARD_TYPES_URL}`).subscribe((res) => {
            this.cards = res;
            this.card = this.cards[this.cardTypeId];
            this.signupForm.patchValue({ cardType: this.card.id });

            this.cardImage = this.card.id.toLowerCase().replace(" ", "_") + ".png";
        });
    }

    //autofill form with user info
    loadUserInfo() {
        this.httpService.getAll(`${environment.USERS_URL}` + '/userinfo/' + this.authService.userId).subscribe((res: any) => {
            this.user = res[0];
            this.signupForm.patchValue({ userId: this.authService.userId });
            this.signupForm.patchValue({ firstName: this.user.first_name });
            this.signupForm.patchValue({ lastName: this.user.last_name });

            this.user.phone = this.phonePipe.transform(this.user.phone, 'US');
            this.signupForm.patchValue({ phone: this.user.phone });
            this.signupForm.patchValue({ email: this.user.email });

            this.signupForm.patchValue({ address: this.user.street_address });
            this.signupForm.patchValue({ city: this.user.city });
            this.signupForm.patchValue({ state: this.user.us_state });
            this.signupForm.patchValue({ zip: this.user.zip_str });
        });
    }

    //submit form
    onSubmit = (fields: any) => {
        console.log('Submitting card signup form...');
        this.showSpinner = true;

        this.httpService.postForm(`${environment.CARDS_URL}`, fields).subscribe(
            (response: any) => {
                console.log("Form saved successfully!");
                this.router.navigateByUrl('/cards/approved');
            }, error => {
                console.log("Form submit failed - Status " + error.status);
            }
        );

    //   this.httpService.postForm(`${environment.CARDS_URL}`, fields).toPromise()
    //     .then((res:any)=>{
    //       console.log(res)
    //       let newCardID = res.headers.get('Location').toString().replace(environment.CARDS_URL+"/",'');
    //       console.log(newCardID)
    //       this.httpService.signUpEmailConfirm(`${environment.EMAILCONFIRM_CARD}`,{ "email":`${this.user.email}`,
    //         "firstName":`${this.user.first_name}`,
    //         "account_id":`${newCardID}`})
    //         .toPromise().then(res=>{
    //         console.log("Form saved successfully!")
    //         this.router.navigateByUrl('/cards/approved')
    //       },error => {
    //           console.log("Form submit failed - Status " + error.status);
    //       })
    // })

    };

    //enable submit button when all fields are valid
    enableSubmit(): boolean {
        // return true;
        return this.signupForm.valid;
    }
}
