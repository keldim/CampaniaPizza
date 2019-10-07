import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // private userService: UserService,

  // this.userService.getUserByUsername('john')
  //   .subscribe(
  //     (data: User) => this.selectedUser = data,
  //     (err: any) => console.log(err)
  //   );

  // , private http: HttpClient, private router: Router
  constructor(private _authService: AuthService) {
    // this.app.authenticate(undefined, undefined);
  }

  // logout() {
  //   this.http.post('logout', {}).pipe(
  //     finalize(() => {
  //       this.app.authenticated = false;
  //       this.router.navigateByUrl('/login');
  //     })).subscribe();
  // }

  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }

  isLoggedIn() {
    this._authService.isLoggedIn();
  }
}
