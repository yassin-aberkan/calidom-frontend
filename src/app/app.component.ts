import {Component, OnInit} from '@angular/core';
import {TranslationLoader} from "./shared/services/translation-loader.service";
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [LayoutComponent, RouterOutlet],
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
