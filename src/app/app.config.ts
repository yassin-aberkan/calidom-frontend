import { TuiRootModule } from "@taiga-ui/core";
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeNl from '@angular/common/locales/nl';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";
import {TranslationLoader} from "./shared/services/translation-loader.service";
import {LoaderService} from "./shared/services/loader.service";
import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, LOCALE_ID} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MatNativeDateModule} from "@angular/material/core";
import {GoogleLoginProvider, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {TokenInterceptorService} from "./shared/services/token-interceptor.service";
import {provideAnimations} from "@angular/platform-browser/animations";
import {HeatingProductGateway} from "./core/ports/heating-product.gateway";
import {HttpHeatingProductGateway} from "./core/adapters/http-heating-product.gateway";
import {ProductGateway} from "./core/ports/product.gateway";
import {HttpProductGateway} from "./core/adapters/http-product.gateway";
import {provideRouter} from "@angular/router";
import {routes} from "./app-routes";
import {AuthGateway} from "./core/ports/auth.gateway";
import {HttpAuthGateway} from "./core/adapters/http-auth.gateway";
import {CartGateway} from "./core/ports/cart.gateway";
import {InMemoryCartService} from "./core/adapters/in-memory-cart.service";
import {AuthenticationService} from "./shared/services/authentication.service";

registerLocaleData(localeFr);
registerLocaleData(localeNl);

const socialAuthServiceConfig = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          '244586122568-29gbsg8o3najjfa94bf94m86ab1qlmth.apps.googleusercontent.com',
          {
            oneTapEnabled: false,
            prompt: 'consent'
          }
        ),
      },
    ],
    onError: (err) => {
      console.error(err);
    }
  } as SocialAuthServiceConfig,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'fr'
    }),
      MatNativeDateModule, TuiRootModule),
    LoaderService,
    TranslationLoader,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [TranslationLoader, LoaderService],
      multi: true,
    },
    socialAuthServiceConfig,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: HeatingProductGateway, useFactory: () => new HttpHeatingProductGateway() },
    { provide: ProductGateway, useFactory: () => new HttpProductGateway() },
    { provide: AuthGateway, useFactory: () => new HttpAuthGateway() },
    { provide: CartGateway, useFactory: () => new InMemoryCartService() },
  ]
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initApp(translationLoader: TranslationLoader, loaderService: LoaderService): () => Promise<void> {
  return () => {
    return new Promise<void>((resolve) => {
      loaderService.isLoading = true; // Show the loader
      translationLoader.initializeTranslation().then(() => {
        loaderService.isLoading = false; // Hide the loader
        resolve();
      });
    });
  };
}
