import {Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {HttpAuthGateway} from "../../../../core/adapters/http-auth.gateway";
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
import {NgClass, NgIf, NgFor, LowerCasePipe, CommonModule} from '@angular/common';
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule, TuiInputPhoneModule,
  TuiSelectModule
} from "@taiga-ui/kit";
import {TuiDataListModule, TuiErrorModule, TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgClass, NgIf, FaIconComponent, NgFor, RouterLink, LowerCasePipe, TranslateModule, TuiFieldErrorPipeModule, TuiInputModule, TuiErrorModule, TuiSelectModule, TuiDataListWrapperModule, TuiDataListModule, TuiTextfieldControllerModule, TuiInputPasswordModule, TuiInputPhoneModule]
})
export class RegisterComponent {

  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(HttpAuthGateway);

  private _loading = false;
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

  genders = [GenderEnum.MALE, GenderEnum.FEMALE, GenderEnum.OTHER];

  onSubmit() {
    this.form.markAllAsTouched();
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

  toggleTermsAndConditions() {
    this._termsAndConsitions = !this._termsAndConsitions;

  }

  get loading(): boolean {
    return this._loading
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
}
