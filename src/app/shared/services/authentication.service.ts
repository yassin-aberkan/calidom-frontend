import {AuthGateway} from "../../core/ports/auth.gateway";
import {inject, Injectable} from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, catchError, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Injectable()
export class AuthenticationService {
  private authGateway= inject(AuthGateway)
  private socialAuthService = inject(SocialAuthService);

  private _isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.retrievesAuthenticated());
  public isAuthenticated$: Observable<boolean> = this._isAuthenticatedSubject.asObservable();

  login(email: string, password: string): Observable<boolean> {
    return this.authGateway.login(email, password).pipe(
      map((token: string) => {
        this.updateAuthentication(token);
        return this.retrievesAuthenticated();
      }),
      catchError(() => {
        localStorage.removeItem('userToken');
        this._isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  loginWithGoogle(googleIdToken: string): Observable<boolean> {
    return this.authGateway.loginWithGoogle(googleIdToken).pipe(
      map((token: string) => {
        this.updateAuthentication(token);
        return this.retrievesAuthenticated();
      }),
      catchError(() => {
        localStorage.removeItem('userToken');
        this._isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  register(email: string, password: string): Observable<boolean> {
    return this.authGateway.register(email, password).pipe(
      map((token: string) => {
        this.updateAuthentication(token);
        return this.retrievesAuthenticated();
      }),
      catchError(() => {
        localStorage.removeItem('userToken');
        this._isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.socialAuthService.signOut().finally()
    window.location.href = '';
  }

  private updateAuthentication(token: string): void {
    localStorage.setItem('userToken', token);
    this._isAuthenticatedSubject.next(this.retrievesAuthenticated());
  }

  private retrievesAuthenticated() : boolean {
    const token = localStorage.getItem('userToken');
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token!);
    return !isExpired;
  }
}
