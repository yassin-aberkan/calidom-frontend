import {Component, Input} from '@angular/core';
import {Product} from "../../../model/product";
import {Cart} from "../../../model/cart";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.scss']
})
export class CartCheckoutComponent {

  private _products: Array<Product> = new Array<Product>();

  private _cartItems: Array<Cart> | undefined;

  isLoading = true;

  constructor(private productService: ProductService) {
  }

  @Input()
  set carts(carts) {
    if (carts?.length == 0) {
      this.isLoading = false;

    }
    carts?.forEach( cart => {
      this.productService.getProduct(cart.productId).subscribe(
        product => {
          this._products.push(product);
          this.isLoading = false;
        })
    })
    this._cartItems = carts;
  }

  get carts() : Array<Cart> | undefined {
    return this._cartItems;
  }

  get products() : Array<Product> | undefined {
    return this._products;
  }

  getProductById(id : number) {
    return this._products.find(product => product.id == id);
  }

  get totalPrice() {
    return this._cartItems?.reduce((total, cart) => {
      const product = this.products?.find(pr => pr.id === cart.productId);
      if (product) {
        total += product.price * cart.quantity ?? 0;
      }
      return total;
    }, 0) ?? 0;
  }


}
