import { Component } from '@angular/core';
import { ServiceComponent } from './service/service.component';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    standalone: true,
    imports: [ServiceComponent]
})
export class ServicesComponent {



}
