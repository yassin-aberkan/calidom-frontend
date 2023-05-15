import {Component} from '@angular/core';
import {CategoryEnumHelper} from "../../model/enum/category-enum-helper";
import {TranslateService} from "@ngx-translate/core";
import {CategoryEnum} from "../../model/enum/category.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  categories = [CategoryEnum.HEATING, CategoryEnum.SANITARY, CategoryEnum.EQUIPMENT];
  CategoryEnumHelper = CategoryEnumHelper; // Add this line to your component class
  imageUrl = 'assets/user-icon.png';

  constructor(private translate: TranslateService) {
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  get currentLanguage() {
    return this.translate.currentLang
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
