import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {environment} from "../../../environments/environment";
import { map } from 'rxjs/operators';
import {CategoryEnumHelper} from "../models/enum/enum/category-enum-helper";
import {ProductEnumHelper} from "../models/enum/enum/product-enum-helper";
import {CategoryEnum} from "../models/enum/enum/category.enum";
import {ProductEnum} from "../models/enum/enum/product.enum";

@Injectable({
  providedIn: 'root'
})
export class HttpProductGateway {

  http = inject(HttpClient);

  PRODUCT_URL = '/public/product/';
  PRODUCT_CATEGORY_URL = '/public/product/category';
  PRODUCT_TYPE_URL = '/public/product/type';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + this.PRODUCT_URL).pipe(
      map(products => products.map(product => ({
        ...product,
        categoryType: CategoryEnumHelper.getCategoryEnum(product.categoryType),
        productType: ProductEnumHelper.getProductEnum(product.productType),
        expiredDate: new Date(product.expiredDate) // Convert expiredDate to Date
      })))
    );
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl + this.PRODUCT_URL + productId).pipe(
      map(product => ({
        ...product,
        categoryType: CategoryEnumHelper.getCategoryEnum(product.categoryType),
        productType: ProductEnumHelper.getProductEnum(product.productType),
        expiredDate: new Date(product.expiredDate) // Convert expiredDate to Date
      }))
    );
  }

  getProductsByCategory(categoryType : CategoryEnum): Observable<Product[]> {
    const params = new HttpParams().set('categoryType', categoryType);

    return this.http.get<Product[]>(environment.baseUrl + this.PRODUCT_CATEGORY_URL, { params }).pipe(
      map(products => products.map(product => ({
        ...product,
        categoryType: CategoryEnumHelper.getCategoryEnum(product.categoryType),
        productType: ProductEnumHelper.getProductEnum(product.productType),
        expiredDate: new Date(product.expiredDate) // Convert expiredDate to Date
      })))
    );
  }

  getProductsByType(productType : ProductEnum): Observable<Product[]> {
    const params = new HttpParams().set('productType', productType);

    return this.http.get<Product[]>(environment.baseUrl + this.PRODUCT_TYPE_URL, { params }).pipe(
      map(products => products.map(product => ({
        ...product,
        categoryType: CategoryEnumHelper.getCategoryEnum(product.categoryType),
        productType: ProductEnumHelper.getProductEnum(product.productType),
        expiredDate: new Date(product.expiredDate) // Convert expiredDate to Date
      })))
    );
  }

}
