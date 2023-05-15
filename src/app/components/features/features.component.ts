import { Component } from '@angular/core';
import {faTruck, faCartShopping, faHouse} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html'
})
export class FeaturesComponent {

  shopIcon = faCartShopping;
  deliveryIcon = faTruck;
  houseIcon = faHouse;


}
