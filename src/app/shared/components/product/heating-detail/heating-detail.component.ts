import {Component, Input} from '@angular/core';
import {HeatingProduct} from "../../../../core/models/heating-product";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import {InMemoryCartService} from "../../../../core/adapters/in-memory-cart.service";
import {AbstractProduct} from "../product-abstract";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import { NgIf, NgClass } from '@angular/common';

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
    ],
    standalone: true,
    imports: [NgIf, NgClass, TranslateModule]
})
export class HeatingDetailComponent extends AbstractProduct{
  _heatingProduct: HeatingProduct | undefined;
  @Input() override set product(value: HeatingProduct | undefined) {
    super.product = value;
    this._heatingProduct = value
  }

  cartState: 'idle' | 'added' = 'idle';


  constructor(translateService: TranslateService, cartService: InMemoryCartService, router: Router) {
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
