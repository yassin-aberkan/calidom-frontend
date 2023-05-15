import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product";
import {CategoryEnumHelper} from "../../model/enum/category-enum-helper";
import {ProductEnum} from "../../model/enum/product.enum";
import {CategoryEnum} from "../../model/enum/category.enum";

@Component({
  selector: 'app-heating-page',
  templateUrl: './heating-page.component.html',
  styleUrls: ['./heating-page.component.scss']
})
export class HeatingPageComponent  implements OnInit{

  products: Product[] = []
  CategoryEnumHelper = CategoryEnumHelper;

  HeatingProductType = [ProductEnum.GAZ_WALL_HEATING, ProductEnum.GAZ_FLOOR_HEATING, ProductEnum.OIL_FLOOR_HEATING, ProductEnum.PELLET_HEATER]

  loading: boolean = false;


  constructor(protected productService: ProductService) {
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
        console.error('Error fetching products:', error);
        this.loading = false; // Set loading state to false in case of an error
      }
    );
  }

  setProducts(products: Product[]) {
    this.products = products
  }
}
