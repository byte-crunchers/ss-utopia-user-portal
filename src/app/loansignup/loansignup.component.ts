import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-loansignup',
    templateUrl: './loansignup.component.html',
    styleUrls: ['./loansignup.component.css']
})
export class LoanSignupComponent implements OnInit {

    constructor(
        private httpService: HttpService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        public router: Router
    ) { }

    loans: any;
    images = ["mortgage.jpg", "auto_loan.jpg", "student_loan.png", "personal_loan.jpg", "payday_loan.jpg"];
    loanType = 0;
    loan: any;  //currently selected loan
    result = 0;  //calculator result
    calcError = false;
    showSpinner = false;

    //define form field validators
    signupForm = this.fb.group({
        loanType: [''],  //hidden field for POST
        principal: ['', [Validators.required, Validators.pattern(/^[\d\.]+$/)]],
        term: ['', [Validators.required, Validators.pattern(/^[\d\.]+$/)]],
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

        //get choice from querystring
        this.route.queryParams.subscribe(params => {
            this.loanType = params['type'];
            if (this.loanType == null)
                this.loanType = 0;
            this.loans = [];
            this.loadAllLoans();
            this.signupForm.patchValue({ loanType: this.loanType });
        });
    }

    loadAllLoans() {
        this.httpService.getAll(`${environment.LOANS_URL}`).subscribe((res) => {
            this.loans = res;
            this.loan = this.loans[this.loanType];
        });
    }

    //calculate button
    calculate(fields: any) {
        try {
            let p = fields.principal;  //loan amount
            let t = fields.term;  //years
            let r = this.loan.interestRate;  //monthly rate
            let e = Math.pow(1 + r, t * 12);

            this.result = p * r * e / (e - 1);  //monthly payment
            this.calcError = false;
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
        console.log('Submitting loan signup form...');
        this.showSpinner = true;

        this.httpService.postForm(`${environment.LOANS_URL}` + '/form', fields).subscribe(
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
