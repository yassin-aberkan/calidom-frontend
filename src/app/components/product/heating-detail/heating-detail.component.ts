import {Component, Input} from '@angular/core';
import {HeatingProduct} from "../../../model/heating-product";

@Component({
  selector: 'app-heating-detail',
  templateUrl: './heating-detail.component.html',
  styleUrls: ['./heating-detail.component.scss']
})
export class HeatingDetailComponent {

  @Input() heatingProduct : HeatingProduct | undefined;

  descriptionToggle = true;
}
