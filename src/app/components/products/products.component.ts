import {Component, Input} from '@angular/core';
import {Product} from "../../model/product";
import {CategoryEnum} from "../../model/enum/category.enum";
import {animate, style, transition, trigger} from "@angular/animations";

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
