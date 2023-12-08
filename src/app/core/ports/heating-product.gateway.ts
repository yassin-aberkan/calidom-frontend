import {Observable} from "rxjs";
import {HeatingProduct} from "../models/heating-product";

export abstract class HeatingProductGateway {
  abstract getHeatingProducts(): Observable<HeatingProduct[]>;
  abstract getHeatingProduct(id: number): Observable<HeatingProduct>;
}
