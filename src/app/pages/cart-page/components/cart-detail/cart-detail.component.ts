import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../../core/models/product";
import {faMinus, faPlus, faRemove} from "@fortawesome/free-solid-svg-icons";
import {HttpProductGateway} from "../../../../core/adapters/http-product.gateway";
import {Cart} from "../../../../core/models/cart";
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, UpperCasePipe, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-cart-detail',
    templateUrl: './cart-detail.component.html',
    styleUrls: ['./cart-detail.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, NgFor, UpperCasePipe, DecimalPipe, TranslateModule]
})
export class CartDetailComponent {
  private _product: Product | undefined;
  private _selectedQuantity: number = 1;
  quantities: Array<number> = [1, 2, 3, 4, 5];
  minusIcon = faMinus;
  plusIcon = faPlus;
  remo = faRemove;

  constructor(private productService : HttpProductGateway) {
  }

  @Input()
  set productId (id : number) {
    this.productService.getProduct(id).subscribe( product => this._product = product);
  }

  @Input()
  set quantity (quantity : number) {
    this._selectedQuantity = quantity
  }

  get product(): Product {
    return <Product>this._product;
  }

  get selectedQuantity(): number {
    return this._selectedQuantity;
  }

  set selectedQuantity(value){
    this._selectedQuantity = value;
    const cart: Cart = {
      productId: this._product!.id,
      quantity: value,
    };
    this.updateCart.emit(cart);
  }

  @Output() updateCart = new EventEmitter <Cart>;

  delete() {
    const cart: Cart = {
      productId: this._product!.id,
      quantity: 0,
    };
    this.updateCart.emit(cart);
  }
}
