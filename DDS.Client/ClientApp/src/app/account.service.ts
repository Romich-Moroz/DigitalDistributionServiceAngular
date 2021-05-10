import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private apiUrl: string, private options: any, private httpErrorHandler: (error: HttpErrorResponse) => Observable<any>) { }

  changePassword(newPassword: string) {
    var params = new FormData();
    params.append("newPassword", newPassword);
    return this.http.post(this.apiUrl + "/account/update", params, this.options).pipe(catchError(this.httpErrorHandler));
  }
}
