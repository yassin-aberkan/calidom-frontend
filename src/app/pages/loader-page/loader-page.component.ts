import { Component } from '@angular/core';
import {TranslationLoader} from "../../service/translation-loader.service";

@Component({
  selector: 'app-loader-page',
  templateUrl: './loader-page.component.html',
  styleUrls: ['./loader-page.component.scss']
})
export class LoaderPageComponent {
  isLoading: boolean = true;

  constructor(private translationLoader: TranslationLoader) {}

  ngOnInit() {
    this.translationLoader.translationLoaded.subscribe(() => {
      this.isLoading = false;
    });
  }
}
