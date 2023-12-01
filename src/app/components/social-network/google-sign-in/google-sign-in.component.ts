import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SocialAuthService, SocialUser,GoogleLoginProvider} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.scss']
})
export class GoogleSignInComponent implements OnInit {
  private _user?: SocialUser;
  private _isLoging: boolean = false;
  @Output() socialUser = new EventEmitter <SocialUser>;

  constructor(private socialAuthService: SocialAuthService) {}
  ngOnInit(): void {
    // this.socialAuthService.authState.subscribe((user) => {
    //   this._user = user
    //   if (this._isLoging) {
    //     this.socialUser.emit(this._user);
    //   }
    // });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (user: SocialUser) => {
        // Gérer les informations de l'utilisateur connecté ici
        console.log('Utilisateur connecté avec Google:', user);
      },
      (error: any) => {
        // Gérer les erreurs de connexion ici
        console.error('Erreur de connexion avec Google:', error);
      }
    );
  }

  isLoging() {
    console.log(44)
    this._isLoging = true
  }
}
