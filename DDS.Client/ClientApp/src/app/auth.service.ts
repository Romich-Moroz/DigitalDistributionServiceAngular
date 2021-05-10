import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = null;

  constructor(private http: HttpClient, private apiUrl: string, private options: any, private httpErrorHandler: (error: HttpErrorResponse) => Observable<any>) { }

  authenticate(email: string, password: string): Observable<User>{
    var params = new FormData();
    params.append("email", email);
    params.append("password", password);
    return this.http.post<User>(this.apiUrl + "/auth/authorize", params, this.options).pipe(catchError(this.httpErrorHandler));
  }


  register(email: string, password: string) {
    var params = new FormData();
    params.append("email", email);
    params.append("password", password);
    return this.http.post(this.apiUrl + "/auth/register", params, this.options).pipe(catchError(this.httpErrorHandler));
  }

  restore(email: string) {
    var params = new FormData();
    params.append("email", email);
    return this.http.post(this.apiUrl + "/auth/restore", params, this.options).pipe(catchError(this.httpErrorHandler));
  }

  confirm(code: string): Observable<User> {
    var params = new FormData();
    params.append("code", code);
    return this.http.post<User>(this.apiUrl + "/auth/confirm", params, this.options).pipe(catchError(this.httpErrorHandler));
  }

  logout(): Observable<void> {
    return this.http.post(this.apiUrl + "/auth/logout", "", this.options).pipe(catchError(this.httpErrorHandler));
  }

  check() {
    this.http.post<User>(this.apiUrl + "/auth/check", "", this.options).pipe(catchError(this.httpErrorHandler)).subscribe(data => this.currentUser = data);
  }

}
