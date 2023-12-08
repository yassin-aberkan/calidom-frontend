import {Observable} from "rxjs";
import {Product} from "../models/product";
import {CategoryEnum} from "../models/enum/enum/category.enum";
import {ProductEnum} from "../models/enum/enum/product.enum";

export abstract class ProductGateway {

  abstract getProducts(): Observable<Product[]>;
  abstract getProduct(): Observable<Product>;
  abstract getProductsByCategory(ategoryType : CategoryEnum): Observable<Product[]>;
  abstract getProductsByType(productType : ProductEnum): Observable<Product[]>

}
