import {Component, ViewChild} from '@angular/core';
import {AuthService} from "../../../core/adapters/auth.service";
import { MatDialog } from '@angular/material/dialog';
import {LoginComponent} from "../login/login.component";
import {ModalLoginComponent} from "../modal-login/modal-login.component";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";
import {GoogleSignInComponent} from "../google-sign-in/google-sign-in.component";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-header-login',
    templateUrl: './header-login.component.html',
    styleUrls: ['./header-login.component.scss'],
    standalone: true,
    imports: [NgIf, LoginComponent]
})
export class HeaderLoginComponent {

  @ViewChild(GoogleSignInComponent) googleComponent!: GoogleSignInComponent;

  constructor(private authService: AuthService, public dialog: MatDialog, private router: Router, private socialAuthService: SocialAuthService) {}


  protected isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  protected logout() {
    this.socialAuthService.signOut().finally();
    return this.authService.logout();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalLoginComponent, {
      width: '500px',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
