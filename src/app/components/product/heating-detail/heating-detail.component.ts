import {Component, Input, OnInit} from '@angular/core';
import {HeatingProduct} from "../../../model/heating-product";
import {TranslateService} from "@ngx-translate/core";
import {CartService} from "../../../service/cart.service";
import {AbstractProduct} from "../product-abstract";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-heating-detail',
  templateUrl: './heating-detail.component.html',
  styleUrls: ['./heating-detail.component.scss'],
  animations: [
    trigger('addCartAnimation', [
      state('idle', style({
        transform: 'scale(1)'
      })),
      state('added', style({
        transform: 'scale(1.1)'
      })),
      transition('idle => added', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class HeatingDetailComponent extends AbstractProduct{
  _heatingProduct: HeatingProduct | undefined;
  @Input() override set product(value: HeatingProduct | undefined) {
    super.product = value;
    this._heatingProduct = value
  }

  cartState: 'idle' | 'added' = 'idle';


  constructor(translateService: TranslateService,cartService: CartService, router: Router) {
    super(translateService, cartService, router);
  }

  get heatingProduct(): HeatingProduct | undefined{
    return this._heatingProduct;
  }


  animate() {
    // Trigger the animation
    this.cartState = 'added';
    setTimeout(() => {
      this.cartState = 'idle';
    }, 150);
  }
}
