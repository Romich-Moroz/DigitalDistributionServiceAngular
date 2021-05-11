import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cart } from '../../models/cart';
import { Game } from '../../models/game';
import { Genre } from '../../models/genre';
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

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl + "/store/genres", this.options).pipe(catchError(this.httpErrorHandler));
  }

  getGame(gameId: number) {
    return this.http.get<Game>(this.apiUrl + "/store/games/" + gameId, this.options).pipe(catchError(this.httpErrorHandler));
  }

  getCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl + "/store/carts", this.options).pipe(catchError(this.httpErrorHandler));
  }

  addToCart(gameId: number) {
    return this.http.post<Cart>(this.apiUrl + "/store/games/"+gameId+"/carts",'', this.options).pipe(catchError(this.httpErrorHandler));
  }

  deleteFromCart(cartId: number) {
    return this.http.delete(this.apiUrl + "/store/carts/" + cartId, this.options).pipe(catchError(this.httpErrorHandler));
  }

  checkout() {
    return this.http.post(this.apiUrl + "/store/carts/checkout", '', this.options).pipe(catchError(this.httpErrorHandler));
  }


}
