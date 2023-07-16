import {EventEmitter, Injectable} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslationLoader {
  translationLoaded: EventEmitter<void> = new EventEmitter<void>();

  constructor(private translate: TranslateService) {}

  initializeTranslation(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.translate.onLangChange.subscribe(() => {
        resolve();
      }, (error) => {
        reject(error);
      });

      this.translate.getTranslation(this.translate.defaultLang).subscribe(() => {
        resolve();
        this.translationLoaded.emit();
      }, (error) => {
        reject(error);
      });
    });
  }
}
