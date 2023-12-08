import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-modal-login',
    templateUrl: './modal-login.component.html',
    styleUrl: './modal-login.component.scss',
    standalone: true,
    imports: [FormsModule, LoginComponent, TranslateModule]
})
export class ModalLoginComponent {

  constructor( public dialog: MatDialog, public router: Router) {
  }
  protected close() {
    this.dialog.closeAll()
  }

  protected isLoggedIn(value: boolean) {
    if (value) {
      this.close()
    }
  }

  signup() {
    this.router.navigate(['/register']);
    this.close()
  }
}
