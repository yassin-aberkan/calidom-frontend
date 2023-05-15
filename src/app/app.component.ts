import {Component, Inject, LOCALE_ID} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'calidom-frontend';
  currentLang: string;

  constructor(@Inject(LOCALE_ID) private localeId: string, private translate: TranslateService) {
    this.currentLang = localeId;
    this.translate.use('fr');

  }

  changeLang(lang: string) {
    this.currentLang = lang;
  }
}
