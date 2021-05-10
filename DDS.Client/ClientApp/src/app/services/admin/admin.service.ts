import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private apiUrl: string, private options: any, private httpErrorHandler: (error: HttpErrorResponse) => Observable<any>) { }

  addGenre(name: string) {
    var params = new FormData();
    params.append("name", name);
    return this.http.post(this.apiUrl + "/admin/genres", params, this.options).pipe(catchError(this.httpErrorHandler));
  }

  deleteGenre(id: number) {
    return this.http.delete(this.apiUrl + "/admin/genres/"+ id, this.options).pipe(catchError(this.httpErrorHandler));
  }

}
