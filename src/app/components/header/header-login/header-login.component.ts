import { Component } from '@angular/core';
import {AuthService} from "../../../service/auth.service";
import { MatDialog } from '@angular/material/dialog';
import {LoginDialogComponent} from "../../login-dialog/login-dialog.component";

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss']
})
export class HeaderLoginComponent {
  constructor(private authService: AuthService, public dialog: MatDialog) {}


  protected isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  protected logout() {
    return this.authService.logout();
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '500px',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
