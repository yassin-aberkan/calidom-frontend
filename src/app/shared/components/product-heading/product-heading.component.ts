import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductEnum} from "../../../core/models/enum/enum/product.enum";
import {Product} from "../../../core/models/product";
import {CategoryEnum} from "../../../core/models/enum/enum/category.enum";
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-product-heading',
    templateUrl: './product-heading.component.html',
    standalone: true,
    imports: [RouterLink, FilterComponent, TitleCasePipe, TranslateModule]
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
