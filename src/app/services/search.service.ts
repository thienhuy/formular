import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ApiResponse, Filter, Season } from '../common/models';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  getSeason(): Observable<Season[]> {
    return this.http.get<ApiResponse>('/season').pipe(
      map((data) => {
        const season = data.data;
        season.sort((a: Season, b: Season) => b.year - a.year);
        return season;
      }),
      catchError(this.handleError<Season[]>('getSeason', []))
    );
  }

  getValue(data: Filter): Observable<any> {
    return this.http
      .get<any>('/season/value', {
        params: new HttpParams()
          .set('year', data.season)
          .set('type', data.type),
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError(this.handleError<Season[]>('getSeason', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
