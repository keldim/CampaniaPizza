import { Component, OnInit, ViewChild } from '@angular/core';
import { PastOrdersComponent } from '../../past-orders.component';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IPastOrder } from '../../past-order';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaModalComponent } from 'src/app/order-online/pizza-modal/pizza-modal.component';
import { SaladModalComponent } from 'src/app/order-online/salad-modal/salad-modal.component';
import { getCurrencySymbol } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { DrinkModalComponent } from 'src/app/order-online/drink-modal/drink-modal.component';
import { DessertModalComponent } from 'src/app/order-online/dessert-modal/dessert-modal.component';

@Component({
  selector: 'app-past-order-detail',
  templateUrl: './past-order-detail.component.html',
  styleUrls: ['./past-order-detail.component.css']
})
export class PastOrderDetailComponent implements OnInit {

  @ViewChild(PizzaModalComponent) pizzaModalComponent;
  @ViewChild(SaladModalComponent) saladModalComponent;

// trial
  @ViewChild(DrinkModalComponent) drinkModalComponent;
  @ViewChild(DessertModalComponent) dessertModalComponent;


  pastOrder: IPastOrder;                                                                                  // trial                               // trial
  constructor(private route: ActivatedRoute, private http: HttpClient, private _authService: AuthService, public storageService: StorageService, private router: Router) {
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
    return this.http.post<IPastOrder>(`http://new-campania-server-env.eba-igwhis5n.us-east-2.elasticbeanstalk.com/registered-user/past-order/${id}`, {}, { headers: headers });
  }
  //    localhost:5000
  //        CampaniaPizzaServer-env-3.eba-igwhis5n.us-east-2.elasticbeanstalk.com

  jsonArrayToArray(jsonArray: string) {
    // console.log(this.pastOrder.pizzaItems);
    return JSON.parse(jsonArray);
  }

  jsonParse(json) {
    console.log(json);
    console.log(JSON.parse(json));
    return JSON.parse(json);
  }

  pizzaItemParse(pizzaItem) {
    if (pizzaItem.type == "BUILD YOUR OWN PIZZA") {
      const parsedItem = {
        type: pizzaItem.price,
        size: pizzaItem.size,
        crust: pizzaItem.crust,
        sauce: pizzaItem.sauce,
        cheese: this.jsonArrayToArray(pizzaItem.cheese),
        veggies: this.jsonArrayToArray(pizzaItem.veggies),
        meats: this.jsonArrayToArray(pizzaItem.meats),
        finishes: this.jsonArrayToArray(pizzaItem.finishes),
        price: pizzaItem.price,
        quantity: pizzaItem.quantity
      }

      return parsedItem;
    } else {
      const parsedItem = {
        type: pizzaItem.price,
        size: pizzaItem.size,
        crust: pizzaItem.crust,
        finishes: this.jsonArrayToArray(pizzaItem.finishes),
        price: pizzaItem.price,
        quantity: pizzaItem.quantity
      }

      return parsedItem;
    }


    // console.log("pizza cheese: " + pizzaItem.cheese);
    // pizzaItem.cheese = this.jsonArrayToArray(pizzaItem.cheese);

    // console.log("pizza veggies: " + pizzaItem.veggies);
    // pizzaItem.veggies = this.jsonArrayToArray(pizzaItem.veggies);

    // console.log("pizza meats: " + pizzaItem.meats);
    // pizzaItem.meats = this.jsonArrayToArray(pizzaItem.meats);

    // console.log("pizza finishes: " + pizzaItem.finishes);
    // pizzaItem.finishes = this.jsonArrayToArray(pizzaItem.finishes);


  }

  saladItemParse(saladItem) {
    if (saladItem.type == "BUILD YOUR OWN SALAD") {
      const parsedItem = {
        type: saladItem.type,
        greens: this.jsonArrayToArray(saladItem.greens),
        cheese: this.jsonArrayToArray(saladItem.cheese),
        freshProduce: this.jsonArrayToArray(saladItem.freshProduce),
        meats: this.jsonArrayToArray(saladItem.meats),
        topItOff: this.jsonArrayToArray(saladItem.topItOff),
        dressings: this.jsonArrayToArray(saladItem.dressings),
        size: saladItem.size,
        price: saladItem.price,
        quantity: saladItem.number
      }

      return parsedItem;
    } else {
const parsedItem = {
        type: saladItem.type,
        size: saladItem.size,
        price: saladItem.price,
        quantity: saladItem.number
      }

      return parsedItem;
    }


    // console.log("greens: " + saladItem.greens);
    // saladItem.greens = this.jsonArrayToArray(saladItem.greens);

    // console.log("cheese: " + saladItem.cheese);
    // saladItem.cheese = this.jsonArrayToArray(saladItem.cheese);

    // console.log("freshProduce: " + saladItem.freshProduce);
    // saladItem.freshProduce = this.jsonArrayToArray(saladItem.freshProduce);

    // console.log("meats: " + saladItem.meats);
    // saladItem.meats = this.jsonArrayToArray(saladItem.meats);

    // console.log("topItOff: " + saladItem.topItOff);
    // saladItem.topItOff = this.jsonArrayToArray(saladItem.topItOff);

    // console.log("dressings: " + saladItem.dressings);
    // saladItem.dressings = this.jsonArrayToArray(saladItem.dressings);


  }

  calculateSubtotal() {
    let subtotal = 0;
    for(let pizzaItem of this.pastOrder.pizzaItems) {
      subtotal += pizzaItem.quantity * pizzaItem.price;
    }
    for(let saladItem of this.pastOrder.saladItems) {
      subtotal += saladItem.quantity * saladItem.price;
    }
    for(let drinkItem of this.pastOrder.drinkItems) {
      subtotal += drinkItem.quantity * drinkItem.price;
    }
    for(let dessertItem of this.pastOrder.dessertItems) {
      subtotal += dessertItem.quantity * dessertItem.price;
    }
    return subtotal;
  }

  calculateLocalTax() {
    return this.calculateSubtotal() * 0.08875;
  }

  calculateTotal() {
    return this.calculateSubtotal() + this.calculateLocalTax();
  }

  showSubtotal() {
    return this.calculateSubtotal().toFixed(2);
  }

  showLocalTax() {
    return this.calculateLocalTax().toFixed(2);
  }

  showTotal() {
    return this.calculateTotal().toFixed(2);
  }

  // trial
  reorder() {
    this.storageService.clear();

    for(let pizzaItem of this.pastOrder.pizzaItems) {
      console.log(pizzaItem);
      this.pizzaModalComponent.pastOrderDetailForm(pizzaItem);
      this.pizzaModalComponent.createTempForm();
      // use resetForm or create a new method for value patch in pizza modal?
    }
    for(let saladItem of this.pastOrder.saladItems) {
      console.log(saladItem);
      this.saladModalComponent.pastOrderDetailForm(saladItem);
      this.saladModalComponent.createTempForm();
    }
    for(let drinkItem of this.pastOrder.drinkItems) {
      console.log(drinkItem);
      this.drinkModalComponent.pastOrderDetailForm(drinkItem);
      this.drinkModalComponent.createTempForm();
    }
    for(let dessertItem of this.pastOrder.dessertItems) {
      console.log(dessertItem);
      this.dessertModalComponent.pastOrderDetailForm(dessertItem);
      this.dessertModalComponent.createTempForm();
    }

    this.storageService.updatePickupLocation("pickupLocation", this.pastOrder.location);

    this.router.navigate(['order-online/current-order']);
  }

}
