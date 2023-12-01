import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private router: Router,
  ) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (isLoggedIn) => {
        if(isLoggedIn) {
          this.router.navigate(['/']);
        }
      }, error => {
      }
    );
  }

  loginWithGoogle(user: SocialUser){
    this.authService.loginWithGoogle(user.idToken).subscribe(
      (isLoggedIn) => {
        if(isLoggedIn) {
          this.router.navigate(['/']);
        }
      }, error => {
      }
    );
  }

  protected isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  protected logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  signup() {
    this.router.navigate(['/register']);
  }
}
