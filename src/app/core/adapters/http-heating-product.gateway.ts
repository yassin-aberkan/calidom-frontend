import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import { map } from 'rxjs/operators';
import {HeatingProduct} from "../models/heating-product";

@Injectable({
  providedIn: 'root'
})
export class HttpHeatingProductGateway {

  http = inject(HttpClient)

  HEATING_PRODUCTS_URL = '/public/product/heating';

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
