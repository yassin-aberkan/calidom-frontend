import {Component} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './components/register/register.component';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
    standalone: true,
    imports: [RegisterComponent, TranslateModule]
})
export class RegisterPageComponent {



}
