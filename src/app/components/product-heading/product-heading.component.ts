import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductEnum} from "../../model/enum/product.enum";
import {Product} from "../../model/product";
import {CategoryEnum} from "../../model/enum/category.enum";

@Component({
  selector: 'app-product-heading',
  templateUrl: './product-heading.component.html'
})
export class ProductHeadingComponent {

  @Input() title!: string;

  @Input() description!: string;

  @Input() category!: CategoryEnum;

  @Input() filters!: ProductEnum[];

  @Input() products!: Product[];

  @Output() updateProducts = new EventEmitter <Product[]>;

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


  setProducts(products: Product[]) {
    this.products = products
    this.updateProducts.emit(products);
  }
}
