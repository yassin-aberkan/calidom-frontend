import {inject, Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {environment} from "../../../environments/environment";
import {RegisterRequest} from "../models/register-request"
import {Product} from "../models/product";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class HttpAuthGateway {

  http = inject(HttpClient)

  LOGIN_URL = '/auth/authenticate';
  REGISTER_URL = '/auth/register';
  LOGIN_GOOGLE = '/auth/authenticate-with-google';

  login(email: string, password: string): Observable<string> {
    const loginData = { email, password };
    return this.http.post<string>(environment.baseUrl + this.LOGIN_URL, loginData);
  }

  loginWithGoogle(googleIdToken: string): Observable<string> {
    const GoogleLoginRequest = { googleIdToken };
    return this.http.post<string>(environment.baseUrl + this.LOGIN_GOOGLE, GoogleLoginRequest).pipe(
      map((result: any) => {
        return result.access_token
      }),
      catchError(() => {
        return of('');
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post<string>(environment.baseUrl + this.REGISTER_URL, registerRequest);
  }
}
