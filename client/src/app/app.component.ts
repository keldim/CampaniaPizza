import { Component } from '@angular/core';
import { SecurityService } from './services/security.service';
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

  constructor(private app: SecurityService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined, undefined);
  }

  logout() {
    this.http.post('logout', {}).pipe(
      finalize(() => {
        this.app.authenticated = false;
        this.router.navigateByUrl('/login');
      })).subscribe();
  }



}
