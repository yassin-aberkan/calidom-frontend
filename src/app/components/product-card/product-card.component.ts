import {Component, Input} from '@angular/core';
import {Product} from "../../model/product";
import {faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: Product;

  arrowDetails = faChevronCircleRight;
  constructor() {
  }

}
