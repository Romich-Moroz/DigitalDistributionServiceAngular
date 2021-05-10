import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game } from '../../models/game';
import { Page } from '../../models/page';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient, private apiUrl: string, private options: any, private httpErrorHandler: (error: HttpErrorResponse) => Observable<any>) { }


  getGames(page: number, pageSize: number, gameName: string = "", minPrice: number = 0, maxPrice: number = 0, genreId: number = 0): Observable<Page<Game>> {
    var params = new FormData();
    params.append("page", page.toString());
    params.append("pageSize", pageSize.toString());
    params.append("gameName", gameName);
    params.append("minPrice", minPrice.toString());
    params.append("maxPrice", maxPrice.toString());
    params.append("genreId", genreId.toString());
    return this.http.post<Page<Game>>(this.apiUrl + "/store/games", params, this.options).pipe(catchError(this.httpErrorHandler));
  }
}
