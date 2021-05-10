import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { StoreService } from './store/store.service';
import { AccountService } from './account/account.service';
import { AdminService } from './admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private options = {
    withCredentials: true 
  };
  apiUrl = 'http://localhost:57212/api'
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

  authService: AuthService;
  storeService: StoreService;
  accountService: AccountService;
  adminService: AdminService;

  constructor(private http: HttpClient) {
    this.authService = new AuthService(http, this.apiUrl, this.options, this.httpErrorHandler);
    this.storeService = new StoreService(http, this.apiUrl, this.options, this.httpErrorHandler);
    this.accountService = new AccountService(http, this.apiUrl, this.options, this.httpErrorHandler);
    this.adminService = new AdminService(http, this.apiUrl, this.options, this.httpErrorHandler);
  }


  ping() {
    return this.http.post(this.apiUrl + "/service/ping", "");
  }

  

  //Auth api
  

}
