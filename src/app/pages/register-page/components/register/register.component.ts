import {Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {AuthService} from "../../../../core/adapters/auth.service";
import {first} from "rxjs/operators";
import {RegisterRequest} from "../../../../core/models/register-request";
import {GenderEnum} from "../../../../core/models/enum/enum/gender.enum";
import {
  nameValidator,
  passwordLengthValidator, phoneNumberValidator
} from "../../../../shared/services/custom-validator";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgClass, NgIf, NgFor, LowerCasePipe } from '@angular/common';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, FaIconComponent, NgFor, RouterLink, LowerCasePipe, TranslateModule]
})
export class RegisterComponent {

  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);

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
    phoneNumber: ['', [ phoneNumberValidator()]],
    gender: [null, Validators.required],
  });


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
      phoneNumber: this.form.get('phoneNumber')?.value,
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

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get gender() {
    return this.form.get('gender');
  }

  get genders(): GenderEnum[] {
    return  Object.values(GenderEnum);
  }
}
