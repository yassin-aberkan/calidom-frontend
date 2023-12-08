import {Component, Input} from '@angular/core';
import {Product} from "../../../core/models/product";
import {CategoryEnum} from "../../../core/models/enum/enum/category.enum";
import {animate, style, transition, trigger} from "@angular/animations";
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('200ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        ProductCardComponent,
        RouterLink,
    ],
})
export class ProductsComponent {

  @Input() products!: Product[]

  @Input() category!: CategoryEnum;

  constructor() {
  }

  getCurrentLink(): string{
    switch (this.category) {
      case CategoryEnum.HEATING:
        return 'chauffages';
      default:
        return '';
    }
  }


  refreshPage() {
    window.location.reload();
  }
}
