import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<LoginDialogComponent>) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe();
    this.dialogRef.close();

  }

  protected isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  protected logOut() {
    this.authService.logout();
  }
}
