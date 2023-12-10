import {Component, OnInit} from '@angular/core';
import {InMemoryCartService} from "../../../core/adapters/in-memory-cart.service";
import {Product} from "../../../core/models/product";
import {Cart} from "../../../core/models/cart";
import {HttpProductGateway} from "../../../core/adapters/http-product.gateway";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-carts-minimal',
    templateUrl: './carts-minimal.component.html',
    styleUrls: ['./carts-minimal.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class CartsMinimalComponent implements OnInit{

  private _products: Array<Product> = new Array<Product>();

  private _cartItems: Array<Cart> | undefined;

  constructor(private cartService: InMemoryCartService, private productService: HttpProductGateway) {
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
