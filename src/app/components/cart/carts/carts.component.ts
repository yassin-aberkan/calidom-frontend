import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../model/product";
import {CartService} from "../../../service/cart.service";
import {Cart} from "../../../model/cart";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent {

  private _cartItems: Array<Cart> | undefined;

  @Output() updateCart = new EventEmitter <Cart>;

  constructor() {
  }

  @Input()
  set carts(value) {
    this._cartItems = value;
  }

  get carts() : Array<Cart> | undefined {
    return this._cartItems;
  }

  update(value : Cart) {
    this.updateCart.emit(value);
  }

}
