import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {first} from "rxjs/operators";
import {RegisterRequest} from "../../model/register-request";
import {GenderEnum} from "../../model/enum/gender.enum";
import {
  invalidDateValidator, minimumAgeValidator,
  nameValidator,
  passwordLengthValidator
} from "../../service/custom-validator";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons/faEyeSlash";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private _loading = false;
  private _submitted = false;
  private _showPassword = false;
  private _termsAndConsitions = false;

  show = faEye;
  hide = faEyeSlash;

  form: FormGroup = this.formBuilder.group({
    firstname: ['', [Validators.required, nameValidator()]],
    lastname: ['', [Validators.required, nameValidator()]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordLengthValidator()]],
    dateBirth: ['', [Validators.required, minimumAgeValidator(), invalidDateValidator()]],
    gender: [null, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  onSubmit() {
    this._submitted = true;
    if (this.form.invalid) {
      return;
    }
    this._loading = true;

    this.authService.register(this.buildRegisterRequest())
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: () => {
          this._loading = false;
        }
      });
  }

  private buildRegisterRequest() : RegisterRequest {
    return {
      firstname: this.form.get('firstname')?.value,
      lastname: this.form.get('lastname')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      dateBirth: this.form.get('dateBirth')?.value,
      gender: this.form.get('gender')?.value,
    };
  }

  togglePasswordVisibility() {
    this._showPassword = !this._showPassword;
  }
  toggleTermsAndConditions() {
    this._termsAndConsitions = !this._termsAndConsitions;

  }

  get submitted(): boolean {
    return this._submitted
  }

  get loading(): boolean {
    return this._loading
  }

  get showPassword(): boolean {
    return this._showPassword
  }

  get termsAndConditions(): boolean {
    return this._termsAndConsitions
  }

  get firstname() {
    return this.form.get('firstname');
  }

  get lastname() {
    return this.form.get('lastname');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get dateBirth() {
    return this.form.get('dateBirth');
  }

  get gender() {
    return this.form.get('gender');
  }

  get genders(): GenderEnum[] {
    return  Object.values(GenderEnum);
  }
}
