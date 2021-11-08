import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
		templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

		registerForm: FormGroup;
		data: any;
		showUnauthorized = false;
		showSpinner = false;

		constructor(
				private formBuilder: FormBuilder,
				public authService: AuthService,
				private router: Router
		) { }

		get f() { return this.registerForm.controls; }

		onSubmit(formValues:any) {
				console.warn('Submitted', this.registerForm.value);
				this.router.navigateByUrl('/login');
		}

		ngOnInit() {
			this.registerForm = this.formBuilder.group({
					firstName: ['', [Validators.required, Validators.maxLength(50)]],
					lastName: ['', [Validators.required, Validators.maxLength(50)]],
					email: ['', [Validators.required, Validators.maxLength(62), Validators.email]],
					phone: ['', [
						Validators.required,
						Validators.maxLength(11),
						Validators.pattern("^[0-9]{11}$")]],
					ssn: ['', [
							Validators.required,
							Validators.maxLength(9),
							Validators.pattern("^[0-9]{9}$")]],
					address: ['', [Validators.required]],
					dob: ['', [Validators.required]],
					username: ['', [Validators.required, Validators.maxLength(16)]],
					password: ['', [
						Validators.required,
						Validators.minLength(6),
						Validators.maxLength(16),
						Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]+$")
					]]
				});
		}

}
