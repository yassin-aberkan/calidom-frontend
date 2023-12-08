import {Component, OnInit} from '@angular/core';
import {HttpProductGateway} from "../../core/adapters/http-product.gateway";
import {Product} from "../../core/models/product";
import {CategoryEnumHelper} from "../../core/models/enum/enum/category-enum-helper";
import {ProductEnum} from "../../core/models/enum/enum/product.enum";
import {CategoryEnum} from "../../core/models/enum/enum/category.enum";
import { ProductsComponent } from '../../shared/components/products/products.component';
import { NgIf } from '@angular/common';
import { ProductHeadingComponent } from '../../shared/components/product-heading/product-heading.component';

@Component({
    selector: 'app-heating-page',
    templateUrl: './heating-page.component.html',
    styleUrls: ['./heating-page.component.scss'],
    standalone: true,
    imports: [ProductHeadingComponent, NgIf, ProductsComponent]
})
export class HeatingPageComponent  implements OnInit{

  products: Product[] = []
  CategoryEnumHelper = CategoryEnumHelper;

  HeatingProductType = [ProductEnum.GAZ_WALL_HEATING, ProductEnum.GAZ_FLOOR_HEATING, ProductEnum.OIL_FLOOR_HEATING, ProductEnum.PELLET_HEATER]

  loading: boolean = false;


  constructor(protected productService: HttpProductGateway) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.productService.getProductsByCategory(CategoryEnum.HEATING).subscribe(
      (products: Product[]) => {
        this.products = products;
        this.loading = false; // Set loading state to false after fetching products
      },
      (error: any) => {
        console.error(error);
        this.loading = false; // Set loading state to false in case of an error
      }
    );
  }

  setProducts(products: Product[]) {
    this.products = products
  }
}
