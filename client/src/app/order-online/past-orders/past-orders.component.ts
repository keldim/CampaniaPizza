import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { IPastOrder } from './past-order';
import { Router } from '@angular/router';

@Component({
  selector: 'past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent implements OnInit {
  pastOrders: IPastOrder[] = [];

  constructor(private http: HttpClient, private _authService: AuthService, private router: Router) {

  }

  ngOnInit() {

    this.getPastOrders()
      .subscribe(
        (pastOrdersReceived: IPastOrder[]) => this.pastOrders = pastOrdersReceived,
        (err: any) => console.log(err),
        () => console.log("received response from the server")
      );

      if(this.pastOrders == null) {
        console.log("error in parsing JSON in the server");
        this.router.navigate(['/error-page']);
      }
  }

  getPastOrders(): Observable<Object> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this._authService.getAccessToken()
    });


    console.log("sending request for past orders");
    return this.http.post('http://new-campania-server-env.eba-igwhis5n.us-east-2.elasticbeanstalk.com/registered-user/past-orders', {}, { headers: headers });
  }

  //      localhost:5000
  //      CampaniaPizzaServer-env-3.eba-igwhis5n.us-east-2.elasticbeanstalk.com

  // stdTimezoneOffset(pastOrderDate: string) {
    // pastOrderDate is in UTC
    // getFullYear() and getTimezoneOffset() use local time which is retrieved by the browser
    // Daylight Saving Time (DST) is applied in all parts of U.S., so even if you are in the west coast, DST is calculated,
    // the datepipe in html will convert pastOrderDate (UTC) into either EST or EDT based on DST
    // international? us areas with no dst?
    // use est for caculation also? to avoid confusion?
    // just use UTC? don't specify time? but date will still be affected by DST?
    // eastern time, western time, don't matter, the time itself will still be the same?

  //   let currentDate = new Date(pastOrderDate);
  //   console.log(pastOrderDate);
  //   console.log(currentDate.getHours());
  //   let jan = new Date(currentDate.getFullYear(), 0, 1);
  //   let jul = new Date(currentDate.getFullYear(), 6, 1);

  //   return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  // }

  // isDstObserved(pastOrderDate: string) {
  //   let currentDate = new Date(pastOrderDate);

  //   return currentDate.getTimezoneOffset() < this.stdTimezoneOffset(pastOrderDate);
  // }

}
