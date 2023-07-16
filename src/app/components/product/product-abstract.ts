import {Input, OnInit} from "@angular/core";
import {LanguageEnumHelper} from "../../model/enum/language-enum-helper";
import {TranslateService} from "@ngx-translate/core";
import {CartService} from "../../service/cart.service";
import { Injectable } from '@angular/core';
import {Product} from "../../model/product";
import {Router} from "@angular/router";

@Injectable()
export abstract class AbstractProduct implements OnInit {
  private _product: Product | undefined;
  @Input()
  set product(value: Product | undefined){
    this._product = value;
  }

  descriptionToggle = true;

  protected constructor(private translateService: TranslateService, private cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
  }

  get description(): string | undefined {
    if (this._product == null) {
      return undefined;
    }
    const lang = LanguageEnumHelper.getLanguageEnumEnum(this.translateService.currentLang);
    return this._product.descriptions[lang];
  }

  addCart(): void{
    if(this._product != null) {
      this.cartService.addToCart(this._product.id, 1);
      this.router.navigate(['/panier']);
    }
  }

}
