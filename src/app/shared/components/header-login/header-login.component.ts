import {Component, inject, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {LoginComponent} from "../login/login.component";
import {ModalLoginComponent} from "../modal-login/modal-login.component";
import {GoogleSignInComponent} from "../google-sign-in/google-sign-in.component";
import { NgIf } from '@angular/common';
import {AuthenticationService} from "../../services/authentication.service";
import {IfAuthenticatedDirective} from "../../directives/if-authenticated.directive";
import {IfNotAuthenticatedDirective} from "../../directives/if-not-authenticated.directive";

@Component({
    selector: 'app-header-login',
    templateUrl: './header-login.component.html',
    styleUrls: ['./header-login.component.scss'],
    standalone: true,
  imports: [NgIf, LoginComponent, IfAuthenticatedDirective, IfNotAuthenticatedDirective]
})
export class HeaderLoginComponent {
  private authenticationService = inject(AuthenticationService);
  private dialog = inject(MatDialog);

  @ViewChild(GoogleSignInComponent) googleComponent!: GoogleSignInComponent;

  protected logout() {
    return this.authenticationService.logout();
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
