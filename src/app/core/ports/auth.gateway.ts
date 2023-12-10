import {Observable} from "rxjs";

export abstract class AuthGateway {
  abstract login(email: string, password: string): Observable<string>;
  abstract register(email: string, password: string): Observable<string>;
  abstract loginWithGoogle(googleIdToken: string): Observable<string>;
}
