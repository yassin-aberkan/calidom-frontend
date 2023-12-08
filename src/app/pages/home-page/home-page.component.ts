import { Component } from '@angular/core';
import { ServicesComponent } from './components/services/services.component';
import { FeaturesComponent } from './components/features/features.component';
import { NgClass } from '@angular/common';
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: true,
    imports: [NgClass, FeaturesComponent, ServicesComponent]
})
export class HomePageComponent {
  pathMainImg = 'assets/radiateur.jpg';
  isLoading: boolean = true;

  imageLoaded() {
    this.isLoading = false;
  }

}
