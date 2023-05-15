import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductEnum} from "../../../model/enum/product.enum";
import {Product} from "../../../model/product";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons/faChevronDown";
import {ProductService} from "../../../service/product.service";
import {CategoryEnum} from "../../../model/enum/category.enum";
import {FilterEnum} from "../../../model/enum/filter.enum";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent {

  @Input() filters!: ProductEnum[];

  @Input() products!: Product[];

  @Output() updateProducts = new EventEmitter <Product[]>;

  constructor(private productService : ProductService) {
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
