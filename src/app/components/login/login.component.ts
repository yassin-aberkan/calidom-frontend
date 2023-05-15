import {Component, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  @ViewChild('modal') modal: any;



  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe();
  }

  protected isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
    this.closeModal()
  }

  protected logOut() {
    this.authService.logout();
  }

  openModal() {
    this.modal.nativeElement.classList.add('is-active');
  }

  closeModal() {
    this.modal.nativeElement.classList.remove('is-active');
  }
}
