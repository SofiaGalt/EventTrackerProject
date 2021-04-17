import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Run } from '../models/run';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  private baseUrl = 'http://localhost:8084/';
  private url = this.baseUrl + 'api/runs';

  constructor( private http: HttpClient, private router: Router) { }

  index(): Observable<Run[]> {

    return this.http.get<Run[]>(this.url)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
      );
  }

  show(id): Observable<Run> {

    return this.http.get<Run>(this.url + "/" + id)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
      );
  }

  create(run: Run): Observable<Run> {

    return this.http.post<Run>(this.url, run).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KaBOOM');
      })
    );
  }

  update(run: Run): Observable<Run> {

    return this.http.put<Run>(`${this.url}/${run.id}`, run).pipe(
      catchError((err: any) => {
        console.log("update Kaboom: " + err.value);
        console.log(err);
        return throwError('update KaBOOM');
      })
    );
  }

  destroy(id: number) {

    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KaBOOM');
      })
    );
  }

  getTotalMiles(){
    return this.http.get<number>(this.url + "/totalMiles")
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('KABOOM');
      })
    );
  }
}
