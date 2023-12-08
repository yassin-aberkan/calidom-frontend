import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductEnum} from "../../../../core/models/enum/enum/product.enum";
import {Product} from "../../../../core/models/product";
import {faChevronDown, faFilter} from "@fortawesome/free-solid-svg-icons";
import {HttpProductGateway} from "../../../../core/adapters/http-product.gateway";
import {CategoryEnum} from "../../../../core/models/enum/enum/category.enum";
import {FilterEnum} from "../../../../core/models/enum/enum/filter.enum";
import { TranslateModule } from '@ngx-translate/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    standalone: true,
    imports: [NgClass, NgFor, NgIf, FaIconComponent, TranslateModule]
})
export class FilterComponent {

  @Input() filters!: ProductEnum[];

  @Input() products!: Product[];

  @Output() updateProducts = new EventEmitter <Product[]>;

  constructor(private productService : HttpProductGateway) {
  }

  filterSelected ?: ProductEnum;
  filterIcon = faFilter;
  chevronIcon = faChevronDown;

  protected changeProductsType(filter: ProductEnum) {
    this.filterSelected = filter;
    this.productService.getProductsByType(filter).subscribe( it => this.updateProducts.emit(it));
  }

  protected cancelProductsType() {
    this.filterSelected = undefined;
    this.productService.getProductsByCategory(CategoryEnum.HEATING).subscribe( it => this.updateProducts.emit(it));
  }

  compareProductEnum(productEnum: ProductEnum) : boolean {
    return productEnum === this.filterSelected;
  }

  filterBy(filter: string){
    switch (filter) {
      case FilterEnum.POPULAR:
        this.products.filter(product => product.expiredDate > new Date())
        break;
      case FilterEnum.LOW_PRICE:
        this.products.sort((a, b) => a.price - b.price);
        this.updateProducts.emit(this.products)
        break;
      case FilterEnum.HIGH_PRICE:
        this.products = this.products.sort((a, b) => b.price - a.price);
        this.updateProducts.emit(this.products)
        break;
    }
  }

}
