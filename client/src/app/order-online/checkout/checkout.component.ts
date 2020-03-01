import { Component, OnInit, ViewChild, Input, ElementRef, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PizzaModalComponent } from './../pizza-modal/pizza-modal.component';
import { DessertModalComponent } from './../dessert-modal/dessert-modal.component';
import { SaladModalComponent } from './../salad-modal/salad-modal.component';
import { DrinkModalComponent } from './../drink-modal/drink-modal.component';
import { LocalStorage, LocalStorageService } from 'ngx-store';
import { OrderOnlineComponent } from '../order-online.component';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentOrderComponent } from '../current-order.component';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  creditCardForm: FormGroup;
  contactInfo: FormGroup;
  inoviceImg: any;

  @ViewChild(OrderOnlineComponent) orderOnlineComponent;
  @ViewChild(PizzaModalComponent) pizzaModalComponent;
  @ViewChild(DessertModalComponent) dessertModalComponent;
  @ViewChild(SaladModalComponent) saladModalComponent;
  @ViewChild(DrinkModalComponent) drinkModalComponent;
  @ViewChild(CurrentOrderComponent) currentOrderComponent;

  pizzaItems: any[] = this.storageService.getPizzaItems();
  saladItems: any[] = this.storageService.getSaladItems();
  drinkItems: any[] = this.storageService.getDrinkItems();
  dessertItems: any[] = this.storageService.getDessertItems();
  pickupLocation: string = this.storageService.getPickupLocation();

  @ViewChild('content') content: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  // changed
  constructor(private http: HttpClient, private fb: FormBuilder, public storageService: StorageService, private _authService: AuthService) {
    this.storageService.watchPizzaItems().subscribe(pizzaItems => {
      this.pizzaItems = pizzaItems;
    });
    this.storageService.watchSaladItems().subscribe(saladItems => {
      this.saladItems = saladItems;
    });
    this.storageService.watchDrinkItems().subscribe(drinkItems => {
      this.drinkItems = drinkItems;
    });
    this.storageService.watchDessertItems().subscribe(dessertItems => {
      this.dessertItems = dessertItems;
    });
    this.storageService.watchPickupLocation().subscribe(pickupLocation => {
      this.pickupLocation = pickupLocation;
    });
  }

  namePattern = /^[a-zA-Z]{2,}/;
  emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  phonePattern = /^((\\+91-?)|0)?[0-9]{10}$/;
  cardNumberPattern = /^\d{4}\d{4}\d{4}\d{4}$/;
  monthPattern = /^0[1-9]$|^1[0-2]$/;
  cvcPattern = /^[0-9]{3,4}$/;
  yearPattern = /^20[2-9][0-9]$/;

  ngOnInit() {
    this.creditCardForm = this.fb.group({
      cardNumber: ["", [Validators.required, Validators.pattern(this.cardNumberPattern)]],
      expMonth: ["", [Validators.required, Validators.pattern(this.monthPattern)]],
      expYear: ["", [Validators.required, Validators.pattern(this.yearPattern)]],
      cvc: ["", [Validators.required, Validators.pattern(this.cvcPattern)]]
    });

    this.contactInfo = this.fb.group({
      firstName: ["", [Validators.required, Validators.pattern(this.namePattern)]],
      lastName: ["", [Validators.required, Validators.pattern(this.namePattern)]],
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      phoneNumber: ["", [Validators.required, Validators.pattern(this.phonePattern)]]
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
    if (this.currentOrderComponent.isLoggedIn()) {
      // changed
      const headers = new HttpHeaders({
        'Authorization': `Bearer ` + this._authService.getAccessToken(),
        'token': token,
        'amount': this.orderOnlineComponent.showTotal().toString(),
        'pickupLocation': this.pickupLocation,
        'firstName': this.contactInfo.controls.firstName.value.trim(),
        'lastName': this.contactInfo.controls.lastName.value.trim(),
        'email': this.contactInfo.controls.email.value,
        'phoneNumber': this.contactInfo.controls.phoneNumber.value,
        'invoiceImg': this.inoviceImg,
        // this part only shows as [object]
        // 'pizzaItems': this.pizzaItems,
        // 'saladItems': this.saladItems,
        // 'drinkItems': this.drinkItems,
        // 'dessertItems': this.dessertItems
        'pizzaItems': localStorage.getItem("pizzaItems"),
        'saladItems': localStorage.getItem("saladItems"),
        'drinkItems': localStorage.getItem("drinkItems"),
        'dessertItems': localStorage.getItem("dessertItems")
      });
      console.log(headers);

      this.http.post('http://localhost:8181/registered-user/charge', {}, { headers: headers }).subscribe(resp => {
        console.log(resp);
      });
    } else {
      // changed
      const headers = new HttpHeaders({
        'token': token,
        'amount': this.orderOnlineComponent.showTotal().toString(),
        'pickupLocation': this.pickupLocation,
        'firstName': this.contactInfo.controls.firstName.value.trim(),
        'lastName': this.contactInfo.controls.lastName.value.trim(),
        'email': this.contactInfo.controls.email.value,
        'phoneNumber': this.contactInfo.controls.phoneNumber.value,
        'invoiceImg': this.inoviceImg,
        'pizzaItems': localStorage.getItem("pizzaItems"),
        'saladItems': localStorage.getItem("saladItems"),
        'drinkItems': localStorage.getItem("drinkItems"),
        'dessertItems': localStorage.getItem("dessertItems")
      });
      console.log(headers);

      this.http.post('http://localhost:8181/unregistered-user/charge', {}, { headers: headers }).subscribe(resp => {
        console.log(resp);
      });
    }


    this.storageService.clear();
  }

  downloadPDF() {
    html2canvas(this.content.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.inoviceImg = canvas.toDataURL('image/png').split(",")[1];
    });
  }

  ngAfterViewInit() {
    this.downloadPDF();
  }
}
