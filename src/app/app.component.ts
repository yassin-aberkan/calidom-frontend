import {Component, OnInit} from '@angular/core';
import {TranslationLoader} from "./service/translation-loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private translationLoader: TranslationLoader) {}

  ngOnInit() {
    this.translationLoader.translationLoaded.subscribe(() => {
      this.isLoading = false;
    });
  }

}
