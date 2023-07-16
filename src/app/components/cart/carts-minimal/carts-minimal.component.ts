import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../service/cart.service";
import {Product} from "../../../model/product";
import {Cart} from "../../../model/cart";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-carts-minimal',
  templateUrl: './carts-minimal.component.html',
  styleUrls: ['./carts-minimal.component.scss']
})
export class CartsMinimalComponent implements OnInit{

  private _products: Array<Product> = new Array<Product>();

  private _cartItems: Array<Cart> | undefined;

  constructor(private cartService: CartService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this._cartItems = this.cartService.cartItems
    this.cartService.cartItems.forEach( cart => {
      this.productService.getProduct(cart.productId).subscribe(
        product => this._products?.push(product))
    })
  }

  get nbCarts(): number {
    if (this._cartItems == null) {
      return 0;
    }
    return this._cartItems.length
  }

  get totalPrice() {
    return this._cartItems?.reduce((total, cart) => {
      const product = this._products?.find(pr => pr.id === cart.productId);
      if (product) {
        total += product.price * cart.quantity ?? 0;
      }
      return total;
    }, 0) ?? 0;
  }
}
