import {Component, Input} from '@angular/core';
import {Product} from "../../../core/models/product";
import {faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    standalone: true,
    imports: [RouterLink, FaIconComponent, TranslateModule]
})
export class ProductCardComponent {

  @Input() product!: Product;

  arrowDetails = faChevronCircleRight;
  constructor() {
  }

}
