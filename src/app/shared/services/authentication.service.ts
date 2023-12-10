import {AuthGateway} from "../../core/ports/auth.gateway";
import {inject, Injectable} from "@angular/core";
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import {catchError, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Injectable()
export class AuthenticationService {
  private authGateway= inject(AuthGateway)
  private socialAuthService = inject(SocialAuthService);

  login(email: string, password: string): Observable<boolean> {
    return this.authGateway.login(email, password).pipe(
      map((token: string) => {
        localStorage.setItem('userToken', token);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  loginWithGoogle(googleIdToken: string): Observable<boolean> {
    return this.authGateway.loginWithGoogle(googleIdToken).pipe(
      map((token: string) => {
        localStorage.setItem('userToken', token);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  register(email: string, password: string): Observable<boolean> {
    return this.authGateway.register(email, password).pipe(
      map((token: string) => {
        localStorage.setItem('userToken', token);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public isAuthenticated() : boolean {
    const token = localStorage.getItem('authToken');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.socialAuthService.signOut().finally()
    window.location.href = '';
  }
}
