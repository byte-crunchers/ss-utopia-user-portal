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
    selector: 'app-loansignup',
    templateUrl: './loansignup.component.html',
    styleUrls: ['./loansignup.component.css']
})
export class LoanSignupComponent implements OnInit {

    constructor(
        public authService: AuthService,
        private httpService: HttpService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        public router: Router,
        private phonePipe: PhonePipe
    ) { }

    user: any;  //user info
    loans: any;
    loanImage = "blank.jpg";
    loanTypeId = 0;
    loan: any;  //currently selected loan
    interestRate = 0;  //calculated monthly interest rate
    result = 0;  //calculated monthly payment
    calcError = false;
    showSpinner = false;
    options: any  //term length choices

    //define form field validators
    signupForm = this.fb.group({
        userId: [''],  //hidden field
        loanType: [''],  //hidden field
        monthlyPayment: ['', Validators.required],  //calculated field
        interestRate: ['', Validators.required],  //calculated field
        principal: ['', [Validators.required, Validators.pattern(/^[\d\.]+$/)]],
        term: ['', [Validators.required, Validators.pattern(/^[\d\.]+$/)]],
        income: ['', [Validators.required, Validators.pattern(/^[\d\.]+$/)]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
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
        this.loan = {};
        this.user = {};

        this.loadUserInfo();

        //get choice from querystring
        this.route.queryParams.subscribe(params => {
            this.loanTypeId = params['type'];
            if (this.loanTypeId == null)
                this.loanTypeId = 0;
            this.loans = [];
            this.loadAllLoans();
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

    loadAllLoans() {
        this.httpService.getAll(`${environment.LOAN_TYPES_URL}`).subscribe((res) => {
            this.loans = res;
            this.loan = this.loans[this.loanTypeId];
            this.signupForm.patchValue({ loanType: this.loan.loanName });

            this.loanImage = this.loan.loanName.toLowerCase().replace(" ", "_") + ".jpg";
            this.setTermOptions();
        });
    }

    //set choices for term length, in months
    setTermOptions() {
        let increment = (this.loan.loanName == "Payday Loan" ? 1 : 12);
        let size = (this.loan.termMax - this.loan.termMin) / increment + 1;

        this.options = new Array(size + 1);
        this.options[0] = { value: '', text: 'Choose...' };

        for (let i = 1; i < this.options.length; i++) {
            let x = (i - 1) * increment + this.loan.termMin;
            this.options[i] = { value: x, text: x };
        }
    }

    //autofill form with user info
    loadUserInfo() {
        this.httpService.getAll(`${environment.ACCOUNTS_URL}` + '/userinfo/' + this.authService.name).subscribe((res: any) => {
            this.user = res[0];
            this.signupForm.patchValue({ userId: this.authService.userId });
            this.signupForm.patchValue({ firstName: this.user.first_name });
            this.signupForm.patchValue({ lastName: this.user.last_name });

            this.user.phone = this.phonePipe.transform(this.user.phone, 'US');
            this.signupForm.patchValue({ phone: this.user.phone });
            this.signupForm.patchValue({ email: this.user.email });
        });
    }

    //calculate button
    calculate(fields: any) {
        try {
            let p = fields.principal;  //loan amount
            let t = fields.term;  //months

            //scale interest rate based on term length
            let scale = (t - this.loan.termMin) / (this.loan.termMax - this.loan.termMin)
            this.interestRate = this.loan.lowerRange + (this.loan.upperRange - this.loan.lowerRange) * (1 - scale);

            let r = this.interestRate;  //monthly rate
            let e = Math.pow(1 + r, t);

            this.result = p * r * e / (e - 1);  //monthly payment
            this.calcError = false;

            //set hidden form fields
            this.signupForm.patchValue({ monthlyPayment: this.result });
            this.signupForm.patchValue({ interestRate: this.interestRate });
        }
        catch (error) {
            console.log(error);
            this.calcError = true;
            this.result = 0;
        }

        //additional validation on output
        if (this.result < 0 || typeof this.result !== 'number' || !isFinite(this.result)) {
            this.calcError = true;
            this.result = 0;
        }
    }

    //submit button
    submit(fields: any) {

        //income filter
        if(fields.income < 30000)
        {
            alert("Your income is too low to qualify for a loan.")
            return;
        }

        console.log('Submitting loan signup form...');
        this.showSpinner = true;

        this.httpService.postForm(`${environment.LOANS_URL}`, fields).subscribe(
            (response: any) => {
                console.log("Form saved successfully!");
                this.router.navigateByUrl('/loans/approved');
            }, error => {
                console.log("Form submit failed - Status " + error.status);
            }
        );
    }

    //enable submit button when all fields are valid
    enableSubmit(): boolean {
        // return true;
        return this.signupForm.valid;
    }
}
