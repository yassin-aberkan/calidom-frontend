import {Component, Input} from '@angular/core';
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { TitleCasePipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    standalone: true,
    imports: [FaIconComponent, TitleCasePipe]
})
export class ServiceComponent {

  @Input() title?: string;
  @Input() subTitle?: string;
  @Input() link?: string;
  @Input() pathImage?: string;
  linkIcon = faArrowRight;

}
