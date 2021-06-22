import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent implements OnInit {
  pastOrders: Object[] = [];

  constructor(private http: HttpClient, private _authService: AuthService, private router: Router, private backendService: BackendService, private zone: NgZone) {

  }

  ngOnInit() {
    this._authService.getAccessToken().then(accessToken => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ` + accessToken
      });
      console.log("sending request for past orders");
      this.http.post(this.backendService.getBackendURL() + 'registered-user/past-orders', {}, { headers: headers }).subscribe(
        (pastOrdersReceived: Object[]) => this.pastOrders = pastOrdersReceived,
        (err: any) => {
          console.log(err);
          if(err.error.error == "invalid_token") {
            this.router.navigate(['/**']);
          }
        },
        () => console.log("received response from the server")
      );
      if (this.pastOrders == null) {
        console.log("error in parsing JSON in the server");
        this.zone.run(() => {
          this.router.navigate(['/error-page']);
        });
      }
    });
  }
}
