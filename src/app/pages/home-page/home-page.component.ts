import { Component } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  pathMainImg = 'assets/radiateur.jpg';
  isLoading: boolean = true;

  imageLoaded() {
    this.isLoading = false;
  }

}
