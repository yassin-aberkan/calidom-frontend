import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../../core/adapters/auth.service";
import {SocialUser} from "@abacritt/angularx-social-login";
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleSignInComponent } from '../google-sign-in/google-sign-in.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf, GoogleSignInComponent, TranslateModule]
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  _submitted = false;

  @Output() handleLogin = new EventEmitter <boolean>;

  constructor(private authService: AuthService) {
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get submitted(): boolean {
    return this._submitted
  }

  onSubmit() {
    this._submitted = true;
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.authService.login(username!, password!).subscribe(
        (isLoggedIn) => {
          this.handleLogin.emit(isLoggedIn);
        },
        (error) => this.handleLogin.emit(false)
      );
    }
  }

  protected loginWithGoogle(user: SocialUser) {
    this.authService.loginWithGoogle(user.idToken).subscribe(
      (isLoggedIn) => {
        this.handleLogin.emit(isLoggedIn);
      },
      (error) => this.handleLogin.emit(false)
    );
  }

}
