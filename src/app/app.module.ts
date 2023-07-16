import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TokenInterceptorService} from "./service/token-interceptor.service";
import { HeaderLoginComponent } from './components/header/header-login/header-login.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeaturesComponent } from './components/features/features.component';
import { ServicesComponent } from './components/services/services.component';
import { ServiceComponent } from './components/services/service/service.component';
import { FooterComponent } from './components/footer/footer.component'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeNl from '@angular/common/locales/nl';
import localeFr from '@angular/common/locales/fr';
import {CommonModule, DatePipe, registerLocaleData} from "@angular/common";
import { HeatingPageComponent } from './pages/heating-page/heating-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductHeadingComponent } from './components/product-heading/product-heading.component';
import { FilterComponent } from './components/product-heading/filter/filter.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeatingDetailPageComponent } from './pages/product-detail-page/heating-detail-page.component';
import { HeatingDetailComponent } from './components/product/heating-detail/heating-detail.component';
import { CartsMinimalComponent } from './components/cart/carts-minimal/carts-minimal.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartDetailComponent } from './components/cart/cart-detail/cart-detail.component';
import { CartsComponent } from './components/cart/carts/carts.component';
import { CartCheckoutComponent } from './components/cart/cart-checkout/cart-checkout.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import { RegisterComponent } from './components/register/register.component';
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import { TermsAndContionsPageComponent } from './pages/register-page/terms-and-contions-page/terms-and-contions-page.component';
import {TranslationLoader} from "./service/translation-loader.service";
import { LoaderPageComponent } from './pages/loader-page/loader-page.component';
import {LoaderService} from "./service/loader.service";

registerLocaleData(localeFr);
registerLocaleData(localeNl);


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    HeaderComponent,
    HeaderLoginComponent,
    LoginDialogComponent,
    HomePageComponent,
    FeaturesComponent,
    ServicesComponent,
    ServiceComponent,
    FooterComponent,
    HeatingPageComponent,
    ProductCardComponent,
    ProductsComponent,
    ProductHeadingComponent,
    FilterComponent,
    HeatingDetailPageComponent,
    HeatingDetailComponent,
    CartsMinimalComponent,
    CartPageComponent,
    CartDetailComponent,
    CartsComponent,
    CartCheckoutComponent,
    RegisterPageComponent,
    RegisterComponent,
    TermsAndContionsPageComponent,
    LoaderPageComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        FontAwesomeModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
          defaultLanguage: 'fr'
        }),
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
  providers: [
    LoaderService,
    TranslationLoader,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [TranslationLoader, LoaderService],
      multi: true,
    },
    {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true},
    {provide: LOCALE_ID, useValue: 'fr'},
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initApp(translationLoader: TranslationLoader, loaderService: LoaderService): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve, reject) => {
      loaderService.isLoading = true; // Show the loader

      translationLoader.initializeTranslation().then(() => {
        loaderService.isLoading = false; // Hide the loader
        resolve();
      });
    });
  };
}
