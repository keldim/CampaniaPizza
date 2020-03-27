import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // authenticated = false;
  private _userManager : UserManager;
  private _user : User;

  constructor(private http: HttpClient) {
    var config = {
      authority: 'http://mitre-openid.us-east-2.elasticbeanstalk.com/',
      client_id: 'client',
      redirect_uri: 'http://campania-pizza-client.s3-website.us-east-2.amazonaws.com/assets/oidc-login-redirect.html',
      // http://localhost:4200/
      scope: 'openid',
      response_type: 'id_token token',
      // projects-api profile
      // prompt: 'none',
      post_logout_redirect_uri: 'http://campania-pizza-client.s3-website.us-east-2.amazonaws.com/?postLogout=true',
      // http://localhost:4200/
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
    return this._userManager.signoutRedirect();
  }

  isLoggedIn(): boolean {
    return this._user && this._user.access_token && !this._user.expired;
  }

  getAccessToken(): string {
    return this._user ? this._user.access_token : '';
  }

  // getAccessToken() {
  //   return this._userManager.getUser().then(user => {
  //     if (!!user && !user.expired) {
  //       return user.access_token;
  //     }
  //     else {
  //       return null;
  //     }
  //   });
  // }

  signoutRedirectCallback(): Promise<any> {
    return this._userManager.signoutRedirectCallback();
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
