import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Cart} from "../../../../core/models/cart";
import { CartDetailComponent } from '../cart-detail/cart-detail.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-carts',
    templateUrl: './carts.component.html',
    styleUrls: ['./carts.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, CartDetailComponent]
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
