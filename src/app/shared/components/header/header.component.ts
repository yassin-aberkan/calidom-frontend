import {Component} from '@angular/core';
import {CategoryEnumHelper} from "../../../core/models/enum/enum/category-enum-helper";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import {CategoryEnum} from "../../../core/models/enum/enum/category.enum";
import {DateAdapter} from "@angular/material/core";
import { HeaderLoginComponent } from '../header-login/header-login.component';
import { CartsMinimalComponent } from '../carts-minimal/carts-minimal.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { NgFor, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        NgFor,
        RouterLink,
        FaIconComponent,
        CartsMinimalComponent,
        HeaderLoginComponent,
        TitleCasePipe,
        TranslateModule,
    ],
})
export class HeaderComponent {

  categories = [CategoryEnum.HEATING, CategoryEnum.SANITARY, CategoryEnum.EQUIPMENT];
  CategoryEnumHelper = CategoryEnumHelper; // Add this line to your component class
  imageUrl = 'assets/user-icon.png';

  constructor(private translate: TranslateService, private dateAdapter: DateAdapter<any>,) {
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.dateAdapter.setLocale(lang);
    this.translate.setDefaultLang(lang);
    localStorage.setItem('defaultLang', lang);
  }

  get currentLanguage() {
    return this.translate.defaultLang
  }

  getCurrentLink(category: CategoryEnum): string{
    switch (category) {
      case CategoryEnum.HEATING:
        return 'chauffages';
      default:
        return '';
    }
  }
}
