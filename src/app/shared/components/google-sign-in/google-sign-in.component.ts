import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser, GoogleSigninButtonModule } from "@abacritt/angularx-social-login";

@Component({
    selector: 'app-google-sign-in',
    templateUrl: './google-sign-in.component.html',
    styleUrls: ['./google-sign-in.component.scss'],
    standalone: true,
    imports: [GoogleSigninButtonModule]
})
export class GoogleSignInComponent implements OnInit {

  authService = inject(SocialAuthService)

  @Output() socialUser = new EventEmitter <SocialUser>;

  ngOnInit(): void {
    this.getAccessToken();
  }

  private _accessToken = '';

  public logout(): void {
    this.authService.signOut().then();
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  private getAccessToken(): void {
    this.authService.authState.subscribe((user) => {
      this.socialUser.emit(user);
    });  }

  private get accessToken() {
    return this._accessToken;
  }

}
