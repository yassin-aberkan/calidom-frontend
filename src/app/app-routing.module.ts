import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {HeatingPageComponent} from "./pages/heating-page/heating-page.component";
import {HeatingDetailPageComponent} from "./pages/product-detail-page/heating-detail-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'chauffages', component: HeatingPageComponent },
  { path: 'chauffages/:id', component: HeatingDetailPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
