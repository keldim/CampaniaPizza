import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaModalComponent } from 'src/app/order-online/pizza-modal/pizza-modal.component';
import { SaladModalComponent } from 'src/app/order-online/salad-modal/salad-modal.component';
import { StorageService } from 'src/app/services/storage.service';
import { DrinkModalComponent } from 'src/app/order-online/drink-modal/drink-modal.component';
import { DessertModalComponent } from 'src/app/order-online/dessert-modal/dessert-modal.component';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-past-order-detail',
  templateUrl: './past-order-detail.component.html',
  styleUrls: ['./past-order-detail.component.css']
})
export class PastOrderDetailComponent implements OnInit {

  @ViewChild(PizzaModalComponent) pizzaModalComponent;
  @ViewChild(SaladModalComponent) saladModalComponent;
  @ViewChild(DrinkModalComponent) drinkModalComponent;
  @ViewChild(DessertModalComponent) dessertModalComponent;


  pastOrder: Object;
  constructor(private route: ActivatedRoute, private http: HttpClient, private _authService: AuthService, public storageService: StorageService, private router: Router, private backendService: BackendService) {
  }

  ngOnInit() {
    let pastOrderId: number = parseInt(this.route.snapshot.params['id']);
    this._authService.getAccessToken().then(accessToken => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ` + accessToken
      });
      this.http.post(`${this.backendService.getBackendURL()}registered-user/past-order/${pastOrderId}`, {}, { headers: headers }).subscribe(
        (pastOrderReceived: Object) => {
          this.pastOrder = pastOrderReceived;
          if (this.pastOrder == null) {
            this.router.navigate(['/error-page']);
          } else if (this.pastOrder['location'] == "Not Found") {
            this.router.navigate(['/**']);
          }
        },
        (err: any) => {
          console.log(err);
          if(err.error.error == "invalid_token") {
            this.router.navigate(['/**']);
          }
        },
        () => console.log("past order successfully loaded")
      );
    });
  }


  jsonArrayToArray(jsonArray: string) {
    return JSON.parse(jsonArray);
  }

  jsonParse(json) {
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

  }

  calculateSubtotal() {
    let subtotal = 0;
    for(let pizzaItem of this.pastOrder["pizzaItems"]) {
      subtotal += pizzaItem.quantity * pizzaItem.price;
    }
    for(let saladItem of this.pastOrder["saladItems"]) {
      subtotal += saladItem.quantity * saladItem.price;
    }
    for(let drinkItem of this.pastOrder["drinkItems"]) {
      subtotal += drinkItem.quantity * drinkItem.price;
    }
    for(let dessertItem of this.pastOrder["dessertItems"]) {
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

  reorder() {
    this.storageService.clear();

    for(let pizzaItem of this.pastOrder["pizzaItems"]) {
      this.pizzaModalComponent.pastOrderDetailForm(pizzaItem);
      this.pizzaModalComponent.createTempForm();
    }
    for(let saladItem of this.pastOrder["saladItems"]) {
      this.saladModalComponent.pastOrderDetailForm(saladItem);
      this.saladModalComponent.createTempForm();
    }
    for(let drinkItem of this.pastOrder["drinkItems"]) {
      this.drinkModalComponent.pastOrderDetailForm(drinkItem);
      this.drinkModalComponent.createTempForm();
    }
    for(let dessertItem of this.pastOrder["dessertItems"]) {
      this.dessertModalComponent.pastOrderDetailForm(dessertItem);
      this.dessertModalComponent.createTempForm();
    }

    this.storageService.updatePickupLocation("pickupLocation", this.pastOrder["location"]);

    this.router.navigate(['order-online/current-order']);
  }

}
