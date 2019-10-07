import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // authenticated = false;
  private _userManager : UserManager;
  private _user : User;

  constructor(private http: HttpClient) {
    // http://localhost:8080/
    var config = {
      authority: 'https://securingangularappscourse-sts.azurewebsites.net',
      client_id: 'spa-client',
      redirect_uri: 'http://localhost:4200/assets/oidc-login-redirect.html',
      scope: 'openid projects-api profile',
      response_type: 'id_token token',
      post_logout_redirect_uri: 'http://localhost:4200/?postLogout=true',
      userStore: new WebStorageStateStore({ store: window.localStorage })
    };
    this._userManager = new UserManager(config);
    this._userManager.getUser().then(user => {
      if (user && !user.expired) {
        this._user = user;
      }
    });
  }

  login(): Promise<any> {
    return this._userManager.signinRedirect();
  }

  logout(): Promise<any> {
    return this._userManager.signinRedirect();
  }

  isLoggedIn(): boolean {
    return this._user && this._user.access_token && !this._user.expired;
  }

  getAccessToken(): string {
    return this._user ? this._user.access_token : '';
  }
  // getUserByUsername(username: string): Observable<User> {
  //   return this.http.get<User>(`http://localhost:8080/users/${username}`, {
  //     headers: new HttpHeaders({
  //       'Accept': 'application/json'
  //     })
  //   });
  // }

  // authenticate(credentials, callback) {

  //   const headers = new HttpHeaders(credentials ? {
  //     authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
  //   } : {});

  //   this.http.get('user', { headers: headers }).subscribe(response => {
  //     if (response['name']) {
  //       this.authenticated = true;
  //     } else {
  //       this.authenticated = false;
  //     }
  //     return callback && callback();
  //   });

  // }
}
