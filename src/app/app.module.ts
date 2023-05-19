import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
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
import {registerLocaleData} from "@angular/common";
import { HeatingPageComponent } from './pages/heating-page/heating-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductHeadingComponent } from './components/product-heading/product-heading.component';
import { FilterComponent } from './components/product-heading/filter/filter.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeatingDetailPageComponent } from './pages/product-detail-page/heating-detail-page.component';
import { HeatingDetailComponent } from './components/product/heating-detail/heating-detail.component';

registerLocaleData(localeNl);
registerLocaleData(localeFr);

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

  ],
  imports: [
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
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    })
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
