import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private options = {
    withCredentials: true 
  };

  apiUrl = 'http://localhost:57212/api'

  constructor(private http: HttpClient) { }


  ping() {
    return this.http.post(this.apiUrl + "/service/ping", "");
  }

  private httpErrorHandler(error: HttpErrorResponse): Observable<any> {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.value}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(error.error.value);
  }

  //Auth api
  authenticate(email: string, password: string): Observable<User> {
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

  logout() {
    return this.http.post(this.apiUrl + "/auth/logout", "", this.options).pipe(catchError(this.httpErrorHandler));
  }

}
