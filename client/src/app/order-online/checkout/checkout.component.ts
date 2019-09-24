import { Component, OnInit, ViewChild, Input, ElementRef, ViewChildren } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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

  pizzaItems: any[] = this.storageService.getPizzaItems();
  saladItems: any[] = this.storageService.getSaladItems();
  drinkItems: any[] = this.storageService.getDrinkItems();
  dessertItems: any[] = this.storageService.getDessertItems();
  pickupLocation: string = this.storageService.getPickupLocation();

  // @LocalStorage() pickupLocation: string;
  // @LocalStorage() pizzaItems: any[];
  // @LocalStorage() dessertItems: any[];
  // @LocalStorage() saladItems: any[];
  // @LocalStorage() drinkItems: any[];

  // pizzaItemsSubscription: BehaviorSubject<any[]> = new BehaviorSubject([]);
  // saladItemsSubscription: BehaviorSubject<any[]> = new BehaviorSubject([]);
  // drinkItemsSubscription: BehaviorSubject<any[]> = new BehaviorSubject([]);
  // dessertItemsSubscription: BehaviorSubject<any[]> = new BehaviorSubject([]);


  @ViewChild('content') content: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  constructor(private http: HttpClient, private fb: FormBuilder, public storageService: StorageService) {
    // this.pizzaItemsSubscription.subscribe(_ => this.pizzaModalComponent.pizzaItems = _);
    // this.saladItemsSubscription.subscribe(_ => this.saladModalComponent.saladItems = _);
    // this.drinkItemsSubscription.subscribe(_ => this.drinkModalComponent.drinkItems = _);
    // this.dessertItemsSubscription.subscribe(_ => this.dessertModalComponent.dessertItems = _);
    // this.drinkItems = this.localStorageService.observe("drinkItems");
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
  // this.orderOnlineComponent.pickupLocation,
  chargeCard(token: string) {
    const headers = new HttpHeaders({
      'token': token,
      'amount': this.orderOnlineComponent.showTotal().toString(),
      'pickupLocation': this.pickupLocation,
      'firstName': this.contactInfo.controls.firstName.value,
      'lastName': this.contactInfo.controls.lastName.value,
      'email': this.contactInfo.controls.email.value,
      'phoneNumber': this.contactInfo.controls.phoneNumber.value,
      'invoiceImg': this.inoviceImg
    });

    this.http.post('http://localhost:8080/payment/charge', {}, { headers: headers }).subscribe(resp => {
        console.log(resp);
    });

    this.storageService.clear();
    // reload localstorage variables?
    // display none orderonlinecomponent? for pickuplocation?

    // this.orderOnlineComponent.pickupLocation = "";
    // this.pizzaModalComponent.pizzaItems = [];
    // this.saladModalComponent.saladItems = [];
    // this.drinkModalComponent.drinkItems = [];
    // this.dessertModalComponent.dessertItems = [];

    // this.orderOnlineComponent.destoryPickUpLocation();
    // this.pizzaModalComponent.pizzaItems.save();
    // this.saladModalComponent.saladItems.save();
    // this.drinkModalComponent.destroyDrinkItems();
    // this.dessertModalComponent.dessertItems.save();
    // this.localStorageService.clear("all");
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

  // calculateSubtotal() {
  //   let subtotal = 0;
  //   for (let pizzaItem of this.pizzaItems) {
  //     subtotal += pizzaItem.quantity * pizzaItem.price;
  //   }
  //   for (let saladItem of this.saladItems) {
  //     subtotal += saladItem.price;
  //   }
  //   for (let drinkItem of this.drinkItems) {
  //     subtotal += drinkItem.price;
  //   }
  //   for (let dessertItem of this.dessertItems) {
  //     subtotal += dessertItem.price;
  //   }
  //   return subtotal;
  // }

  // calculateLocalTax() {
  //   return this.calculateSubtotal() * 0.08875;
  // }

  // calculateTotal() {
  //   return this.calculateSubtotal() + this.calculateLocalTax();
  // }

  // showSubtotal() {
  //   return this.calculateSubtotal().toFixed(2);
  // }

  // showLocalTax() {
  //   return this.calculateLocalTax().toFixed(2);
  // }

  // showTotal() {
  //   return this.calculateTotal().toFixed(2);
  // }
}
