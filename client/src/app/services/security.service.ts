import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  authenticated = false;

  constructor(private http: HttpClient) { }

  // getUserByUsername(username: string): Observable<User> {
  //   return this.http.get<User>(`http://localhost:8080/users/${username}`, {
  //     headers: new HttpHeaders({
  //       'Accept': 'application/json'
  //     })
  //   });
  // }

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(credentials ? {
        authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('user', {headers: headers}).subscribe(response => {
        if (response['name']) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        return callback && callback();
    });

}
}
