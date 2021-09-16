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
    loanType = -1;
    loan: any;  //currently selected loan
    result = 0;  //calculator result
    calcError = false;

    calcForm = this.fb.group({
    });

    //define validators for each field
    signupForm = this.fb.group({
        principal: ['', Validators.required],
        term: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
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
        this.loan = {};

        //get choice from querystring
        this.route.queryParams.subscribe(params => {
            this.loanType = params['type'];
            this.loans = [];
            this.loadAllLoans();
        });
    }

    loadAllLoans() {
        this.httpService.getAll(`${environment.BASE_PAI_URL}${environment.LOANS_GET_URL}`).subscribe((res) => {
            this.loans = res;
            this.loan = this.loans[this.loanType];
        })
    }

    //calculate loan monthly payment
    calculate(fields: any) {
        try {
            let p = fields.principal;
            let t = fields.term;
            let i = this.loan.interestRate;
            this.result = p * Math.pow((1 + i), t) / (t * 12);
            this.calcError = false;
        }
        catch (error) {
            console.log(error);
            this.calcError = true;
            this.result = 0;
        }

        //additional validation
        if (this.result < 0 || typeof this.result !== 'number' || !isFinite(this.result)) {
            this.calcError = true;
            this.result = 0;
        }
    }

    //submit button
    submit(fields: any) {
        console.log('Loan signup form submitted.');
        this.router.navigateByUrl('/loans/approved');
    }

    //enable submit button when all fields are valid
    enableSubmit(): boolean {
        // return true;
        return this.signupForm.valid;
    }
}
