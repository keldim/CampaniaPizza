import { Component, OnInit, ViewChild } from '@angular/core';
import { PastOrdersComponent } from '../../past-orders.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IPastOrder } from '../../past-order';
import { ActivatedRoute } from '@angular/router';
import { PizzaModalComponent } from 'src/app/order-online/pizza-modal/pizza-modal.component';

@Component({
  selector: 'app-past-order-detail',
  templateUrl: './past-order-detail.component.html',
  styleUrls: ['./past-order-detail.component.css']
})
export class PastOrderDetailComponent implements OnInit {
  @ViewChild(PizzaModalComponent) pizzaModalComponent;

  pastOrder: IPastOrder;
  constructor(private route: ActivatedRoute, private http: HttpClient, private _authService: AuthService) {
  }

  ngOnInit() {
    let pastOrderId: number = parseInt(this.route.snapshot.params['id']);
    console.log(pastOrderId);
    this.getPastOrder(pastOrderId)
      .subscribe(
        (pastOrderReceived: IPastOrder) => this.pastOrder = pastOrderReceived,
        (err: any) => console.log(err),
        () => console.log("past order successfully loaded")
      );
  }

  getPastOrder(id: number): Observable<IPastOrder> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this._authService.getAccessToken()
    });
    console.log("sending request for past order");
    return this.http.get<IPastOrder>(`http://localhost:8181/past-order/${id}`, { headers: headers });
  }

  jsonArrayToArray(jsonArray: string) {
    return JSON.parse(jsonArray);
  }

}
