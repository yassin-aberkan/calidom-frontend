import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  LOGIN_URL = '/auth/authenticate';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return new Observable<boolean>((observer) => {
      this.http.post(environment.baseUrl + this.LOGIN_URL, loginData).subscribe( (result: any) => {
        if(result.access_token) {
          observer.next(true)
          localStorage.setItem('userToken', result.access_token);
        } else {
          observer.next(false)
        }
        observer.complete()
      }, error => {
        observer.next(false)
        observer.complete()
      })
    })
  }

  logout() {
    // Remove the user token from local storage
    localStorage.removeItem('userToken');
  }

  get isLoggedIn() {
    return !!localStorage.getItem('userToken');
  }
}
