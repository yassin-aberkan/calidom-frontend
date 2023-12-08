import { Component } from '@angular/core';
import {faTruck, faCartShopping, faHouse} from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-features',
    templateUrl: './features.component.html',
    standalone: true,
    imports: [FaIconComponent]
})
export class FeaturesComponent {

  shopIcon = faCartShopping;
  deliveryIcon = faTruck;
  houseIcon = faHouse;


}
