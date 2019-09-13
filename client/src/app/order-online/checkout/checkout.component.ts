import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { PizzaModalComponent } from './../pizza-modal/pizza-modal.component';
import { DessertModalComponent } from './../dessert-modal/dessert-modal.component';
import { SaladModalComponent } from './../salad-modal/salad-modal.component';
import { DrinkModalComponent } from './../drink-modal/drink-modal.component';
import { LocalStorage } from 'ngx-store';
import { OrderOnlineComponent } from '../order-online.component';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  creditCardForm: FormGroup;
  contactInfo: FormGroup;

  @ViewChild(PizzaModalComponent) pizzaModalComponent;
  @ViewChild(DessertModalComponent) dessertModalComponent;
  @ViewChild(SaladModalComponent) saladModalComponent;
  @ViewChild(DrinkModalComponent) drinkModalComponent;
  @LocalStorage() pickupLocation: string;
  @LocalStorage() pizzaItems: any[];
  @LocalStorage() dessertItems: any[];
  @LocalStorage() saladItems: any[];
  @LocalStorage() drinkItems: any[];


  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    this.creditCardForm = this.fb.group({
      cardNumber: "",
      expMonth: "",
      expYear: "",
      cvc: ""
    });

    this.contactInfo = this.fb.group({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: ""
    });
  }

  chargeCreditCard() {
    (<any>window).Stripe.card.createToken({
      number: this.creditCardForm.controls.cardNumber.value,
      exp_month: this.creditCardForm.controls.expMonth.value,
      exp_year: this.creditCardForm.controls.expYear.value,
      cvc: this.creditCardForm.controls.cvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token);
      } else {
        console.log(response.error.message);
      }
    });
  }

  chargeCard(token: string) {
    const headers = new HttpHeaders({'token': token, 'amount': this.showTotal().toString()});
    this.http.post('http://localhost:8080/payment/charge', {}, {headers: headers})
      .subscribe(resp => {
        console.log(resp);
      })
  }

  calculateSubtotal() {
    let subtotal = 0;
    for(let pizzaItem of this.pizzaItems) {
      subtotal += pizzaItem.quantity * pizzaItem.price;
    }
    for(let saladItem of this.saladItems) {
      subtotal += saladItem.price;
    }
    for(let drinkItem of this.drinkItems) {
      subtotal += drinkItem.price;
    }
    for(let dessertItem of this.dessertItems) {
      subtotal += dessertItem.price;
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
}
