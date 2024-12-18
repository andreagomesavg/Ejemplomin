import { ApiResponsesMovie, ApiResponsesMovies, Movie } from './../common/interfaces';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http :  HttpClient=inject(HttpClient);
  private readonly urlBase = 'http://localhost:3000/api/v1/movies/';

  constructor() {} 

    getMovies():Observable<ApiResponsesMovies>{
      return this.http.get<ApiResponsesMovies>(this.urlBase);
    }
  
    getMovie(id:string):Observable<ApiResponsesMovie>{
      return this.http.get<ApiResponsesMovie>(this.urlBase+'movie/'+id);
    }

    addMovie(movie: Movie): Observable<ApiResponseStatus>{
      return this.http.post<ApiResponseStatus>(this.urlBase, movie);
    }

    updateMovie(movie: Movie): Observable<ApiResponseStatus>{
      return this.http.put<ApiResponseStatus>(this.urlBase+movie._id, movie);
    }

    deleteMovie(id: string): Observable<ApiResponseStatus>{
      return this.http.delete<ApiResponseStatus>(this.urlBase+id);
    }

    getGenres():Observable<ApiResponseGenres>{
      return this.http.get<ApiResponseGenres>(this.urlBase+'genres');
    }
}
export interface ApiResponseStatus{
  status: string;

}

export interface ApiResponseGenres {
  status: string[];
}