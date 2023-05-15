import {Component, Input} from '@angular/core';
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html'
})
export class ServiceComponent {

  @Input() title?: string;
  @Input() subTitle?: string;
  @Input() link?: string;
  @Input() pathImage?: string;
  linkIcon = faArrowRight;

}
