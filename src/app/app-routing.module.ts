import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {HeatingPageComponent} from "./pages/heating-page/heating-page.component";
import {HeatingDetailPageComponent} from "./pages/product-detail-page/heating-detail-page.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {
  TermsAndContionsPageComponent
} from "./pages/register-page/terms-and-contions-page/terms-and-contions-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'chauffages', component: HeatingPageComponent },
  { path: 'chauffages/:id', component: HeatingDetailPageComponent },
  { path: 'panier', component: CartPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'terms-and-conditions', component: TermsAndContionsPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
