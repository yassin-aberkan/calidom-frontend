import {Component, OnInit} from '@angular/core';
import {InMemoryCartService} from "../../core/adapters/in-memory-cart.service";
import {Cart} from "../../core/models/cart";
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';
import { CartsComponent } from './components/carts/carts.component';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cart-detail-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss'],
    standalone: true,
    imports: [RouterLink, NgIf, CartsComponent, CartCheckoutComponent]
})
export class CartPageComponent implements OnInit{
  private _carts: Array<Cart> | undefined;

  constructor(private cartService: InMemoryCartService) {
  }

  ngOnInit(): void {
    this.fetchCarts();
  }

  fetchCarts() {
    this._carts = this.cartService.cartItems
  }

  get cartItems() : Array<Cart> | undefined {
    return this._carts;
  }

  update(cart: Cart) {
    if(cart.quantity == 0) {
      this.cartService.removeFromCart(cart.productId);
    } else if(cart.quantity > 0){
      this.cartService.addToCart(cart.productId, cart.quantity);
    }
    this.fetchCarts()
  }
}
