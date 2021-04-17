import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8084/';
  private url = this.baseUrl + 'api/users';

  constructor( private http: HttpClient, private router: Router) { }

  index(): Observable<User[]> {

    return this.http.get<User[]>(this.url)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('KABOOM');
        })
      );
  }

  // show(id): Observable<Todo> {

  //   return this.http.get<Todo>(this.url + "/" + id, this.getOptions())
  //     .pipe(
  //       catchError((err: any) => {
  //         console.log(err);
  //         return throwError('KABOOM');
  //       })
  //     );
  // }

  // create(item: Todo): Observable<Todo> {

  //   console.log("create todo service ");
  //   item.completed = false;
  //   return this.http.post<Todo>(this.url, item, this.getOptions()).pipe(
  //     catchError((err: any) => {
  //       console.log(err);
  //       return throwError('KaBOOM');
  //     })
  //   );
  // }

  // update(todo: Todo): Observable<Todo> {

  //   return this.http.put<Todo>(`${this.url}/${todo.id}`, todo, this.getOptions()).pipe(
  //     catchError((err: any) => {
  //       console.log("update Kaboom: " + err.value);
  //       console.log(err);
  //       return throwError('update KaBOOM');
  //     })
  //   );
  // }

  // destroy(id: number) {

  //   return this.http.delete(`${this.url}/${id}`, this.getOptions()).pipe(
  //     catchError((err: any) => {
  //       console.log(err);
  //       return throwError('KaBOOM');
  //     })
  //   );
  // }
}
