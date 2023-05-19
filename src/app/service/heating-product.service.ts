import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {environment} from "../../environments/environment";
import { map } from 'rxjs/operators';
import {CategoryEnumHelper} from "../model/enum/category-enum-helper";
import {ProductEnumHelper} from "../model/enum/product-enum-helper";
import {CategoryEnum} from "../model/enum/category.enum";
import {ProductEnum} from "../model/enum/product.enum";
import {HeatingProduct} from "../model/heating-product";

@Injectable({
  providedIn: 'root'
})
export class HeatingProductService {

  HEATING_PRODUCTS_URL = '/public/product/heating';

  constructor(private http: HttpClient) { }

  getHeatingProducts(): Observable<HeatingProduct[]> {
    return this.http.get<HeatingProduct[]>(environment.baseUrl + this.HEATING_PRODUCTS_URL).pipe(
      map(heatingProducts => heatingProducts.map(heatingProduct => ({
        ...heatingProduct,
      })))
    );
  }

  getHeatingProduct(id: number): Observable<HeatingProduct> {
    return this.http.get<HeatingProduct>(environment.baseUrl + this.HEATING_PRODUCTS_URL + '/' + id).pipe(
      map(heatingProduct => heatingProduct));
  }

}
