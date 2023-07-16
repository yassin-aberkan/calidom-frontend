import {Component, OnInit} from '@angular/core';
import {CartService} from "../../service/cart.service";
import {Product} from "../../model/product";
import {Cart} from "../../model/cart";

@Component({
  selector: 'app-cart-detail-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit{
  private _carts: Array<Cart> | undefined;

  constructor(private cartService: CartService) {
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
