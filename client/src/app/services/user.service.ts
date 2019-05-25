import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/users/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }
}
