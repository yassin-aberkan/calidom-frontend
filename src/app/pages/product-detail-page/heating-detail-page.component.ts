import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HeatingProduct} from "../../model/heating-product";
import {HeatingProductService} from "../../service/heating-product.service";
import {CategoryEnum} from "../../model/enum/category.enum";

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './heating-detail-page.component.html',
  styleUrls: ['./heating-detail-page.component.scss']
})
export class HeatingDetailPageComponent  implements OnInit{

  private _prductId?: number;
  private  _category?: CategoryEnum;
  private _heatingProduct?: HeatingProduct;

  constructor(private route: ActivatedRoute, private heatingProductService: HeatingProductService) { }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.route.url.subscribe(segments => {
      const path = segments[0].path;
      switch (path) {
        case 'chauffages':
          this._category = CategoryEnum.HEATING;
          break;
        default:
          return '';
      }
      return '';
    });

    this.route.params.subscribe(params => {
      const productId = params['id'];
      this._prductId = productId;
      this.heatingProductService.getHeatingProduct(productId).subscribe(
        heatingProduct => this._heatingProduct = heatingProduct
      );
    });
  }

  getCurrentLink(): string{
    switch (this._category) {
      case CategoryEnum.HEATING:
        return 'chauffages';
      default:
        return '';
    }
  }

  get productId() : number | undefined {
    return this._prductId;
  }

  get heatingProduct() : HeatingProduct | undefined {
    return this._heatingProduct;
  }

  get category() : CategoryEnum | undefined {
    return this._category;
  }

  get isLoad(): boolean{
    return this._heatingProduct == null;
  }

}
