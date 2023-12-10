import {Component, EventEmitter, inject, Output} from '@angular/core';
import {HttpAuthGateway} from "../../../core/adapters/http-auth.gateway";
import {SocialUser} from "@abacritt/angularx-social-login";
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleSignInComponent } from '../google-sign-in/google-sign-in.component';
import { NgIf } from '@angular/common';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf, GoogleSignInComponent, TranslateModule]
})
export class LoginComponent {

  authenticationService = inject(AuthenticationService);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  @Output() handleLogin = new EventEmitter <boolean>;

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.authenticationService.login(username!, password!).subscribe(
        (isAuthenticated) => {
          this.handleLogin.emit(isAuthenticated);
        }
      );
    }
  }

  protected loginWithGoogle(user: SocialUser) {
    this.authenticationService.loginWithGoogle(user.idToken).subscribe(
      (isAuthenticated) => {
        this.handleLogin.emit(isAuthenticated);
      }
    );
  }

}
