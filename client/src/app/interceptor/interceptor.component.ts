import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

// @Injectable()
// implements HttpInterceptor
export class AuthInterceptor  {
  constructor(private _authService: AuthService, private _router: Router) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (req.url.startsWith('http://localhost:8181/')) {
  //     return from(this._authService.getAccessToken().then(token => {
  //       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //       const authReq = req.clone({ headers });
  //       return next.handle(authReq).pipe(tap(_ => { }, error => {
  //         var respError = error as HttpErrorResponse;
  //         if (respError && (respError.status === 401 || respError.status === 403)) {
  //           // this._router.navigate(['/unauthorized']);
  //           console.log(respError);
  //         }
  //       })).toPromise();
  //     }));
  //   }
  //   else {
  //     return next.handle(req);
  //   }
  // }
}
