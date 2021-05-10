import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Genre } from '../../models/genre';

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

  addGame(name: string, developer: string, description: string, price: number, image: File) {
    var params = new FormData();
    params.append("name", name);
    params.append("developer", developer);
    params.append("description", description);
    params.append("price", price.toString());
    params.append("image", image);
    return this.http.post(this.apiUrl + "/admin/games", params, this.options).pipe(catchError(this.httpErrorHandler));
  }

  updateGame(gameId: number, name: string, developer: string, description: string, price: number, image: File) {
    var params = new FormData();
    params.append("name", name);
    params.append("developer", developer);
    params.append("description", description);
    params.append("price", price.toString());
    params.append("image", image);
    return this.http.put(this.apiUrl + "/admin/games/" + gameId, params, this.options).pipe(catchError(this.httpErrorHandler));
  }

  deleteGame(id : number) {
    return this.http.delete(this.apiUrl + "/admin/games/" + id, this.options).pipe(catchError(this.httpErrorHandler));
  }

  addGameGenre(gameId: number, genreId: number) {

    return this.http.post(this.apiUrl + "/admin/games/" + gameId + "/genres/" + genreId,'', this.options).pipe(catchError(this.httpErrorHandler));
  }

  deleteGameGenre(gameId: number, genreId: number) {
    return this.http.delete(this.apiUrl + "/admin/games/" + gameId + "/genres/" + genreId, this.options).pipe(catchError(this.httpErrorHandler));
  }


}
