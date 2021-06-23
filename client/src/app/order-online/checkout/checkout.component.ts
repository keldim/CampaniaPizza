import { Component, OnInit, ViewChild, Input, ElementRef, ViewChildren, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PizzaModalComponent } from './../pizza-modal/pizza-modal.component';
import { DessertModalComponent } from './../dessert-modal/dessert-modal.component';
import { SaladModalComponent } from './../salad-modal/salad-modal.component';
import { DrinkModalComponent } from './../drink-modal/drink-modal.component';
import { LocalStorage, LocalStorageService } from 'ngx-store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { OrderOnlineComponent } from '../order-online.component';
import { CurrentOrderComponent } from '../current-order.component';

@Component({
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  contactInfoAndPaymentData: Object;
  isLoggedIn = false;
  loading = false;

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



  // changed
  constructor(private http: HttpClient, private fb: FormBuilder, public storageService: StorageService,
    private _authService: AuthService, private router: Router, private backendService: BackendService, private zone: NgZone) {
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
    this._authService.loginChanged.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit() {
    this.getContactInfoAndPaymentData().subscribe(
      (data) => this.contactInfoAndPaymentData = data,
      (err: any) => console.log(err),
      () => console.log("received response from the server 2")
    );
    this._authService.isLoggedIn().then(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  getContactInfoAndPaymentData() {
    return this.http.get(this.backendService.getBackendURL() + 'form-input/ephemeral-data');
  }

  backToContactInfoAndPayment() {
    this.router.navigate(['/contact-info-and-payment']);
  }

  showOnlyLastFourNumbers(creditCardNumber) {
    if (creditCardNumber == '') {
      return "";
    }
    return "**** **** **** " + creditCardNumber.slice(12);
  }

  getCreditCardType(creditCardNumber) {
    if (creditCardNumber == '') {
      return "";
    }

    let amex_regex = new RegExp('^3[47][0-9]{0,}$'); //34, 37
    let visa_regex = new RegExp('^4[0-9]{0,}$'); //4
    let mastercard_regex = new RegExp('^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$'); //2221-2720, 51-55
    let discover_regex = new RegExp('^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$');

    var type = "unknown";
    if (creditCardNumber.match(amex_regex)) {
      type = "Amex";
    } else if (creditCardNumber.match(visa_regex)) {
      type = "Visa";
    } else if (creditCardNumber.match(mastercard_regex)) {
      type = "Mastercard";
    } else if (creditCardNumber.match(discover_regex)) {
      type = "Discover";
    }

    return type;
  }

  formatPhoneNumber(phoneNumber) {
    if (phoneNumber == '') {
      return "";
    }
    return "(" + phoneNumber.slice(0, 3) + ") " + phoneNumber.slice(3, 6) + " - " + phoneNumber.slice(6, 11);
  }



  cancelAndCleanUp() {
    this.http.post(this.backendService.getBackendURL() + 'form-input/cancel', {}).subscribe(resp => {
      console.log(resp);
    });
    this.router.navigate(['/cart']);
  }

  addEmailDisplay(items, type) {
    let result = JSON.parse(items);
    if (type == "pizza") {
      for (let i = 0; i < result.length; i++) {
        result[i] = this.pizzaModalComponent.buildDisplayForEmail(result[i]);
      }
    } else {
      for (let i = 0; i < result.length; i++) {
        result[i] = this.saladModalComponent.buildDisplayForEmail(result[i]);
      }
    }

    return JSON.stringify(result);
  }


  chargeCreditCard() {
    this.loading = true;
    (<any>window).Stripe.card.createToken({
      number: this.contactInfoAndPaymentData['cardNumber'],
      exp_month: this.contactInfoAndPaymentData['expMonth'],
      exp_year: this.contactInfoAndPaymentData['expYear'],
      cvc: this.contactInfoAndPaymentData['cvc']
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token);
      } else {
        this.zone.run(() => {
          this.router.navigate(['/error-page']);
        });
      }
    });
  }

  chargeCard(token: string) {
    if (this.orderOnlineComponent.isLoggedIn) {
      this._authService.getAccessToken().then(accessToken => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ` + accessToken,
          'token': token,
          'amount': this.currentOrderComponent.showTotal().toString(),
          'subtotal': this.currentOrderComponent.showSubtotal().toString(),
          'tax': this.currentOrderComponent.showLocalTax().toString(),
          'pickupLocation': this.pickupLocation,
          'firstName': this.contactInfoAndPaymentData['firstName'],
          'lastName': this.contactInfoAndPaymentData['lastName'],
          'email': this.contactInfoAndPaymentData['email'],
          'phoneNumber': this.formatPhoneNumber(this.contactInfoAndPaymentData['phoneNumber']),
          'pizzaItems': this.addEmailDisplay(localStorage.getItem("pizzaItems"), "pizza"),
          'saladItems': this.addEmailDisplay(localStorage.getItem("saladItems"), "salad"),
          'drinkItems': localStorage.getItem("drinkItems"),
          'dessertItems': localStorage.getItem("dessertItems"),
          'cardLastFourNumbers': this.showOnlyLastFourNumbers(this.contactInfoAndPaymentData['cardNumber']),
          'cardType': this.getCreditCardType(this.contactInfoAndPaymentData['cardNumber'])
        });

        this.http.post(this.backendService.getBackendURL() + 'registered-user/charge', {}, { headers: headers }).subscribe(resp => {
          console.log(resp);
          if (resp == null) {
            this.zone.run(() => {
              this.router.navigate(['/error-page']);
            });
          } else {
            this.zone.run(() => {
              this.router.navigate(['/order-online/thank-you']);
            });
          }
        });

        this.http.post(this.backendService.getBackendURL() + 'form-input/cancel', {}).subscribe(resp => {
          console.log(resp);
        });
        this.storageService.clear();
      });
    } else {
      const headers = new HttpHeaders({
        'token': token,
        'amount': this.currentOrderComponent.showTotal().toString(),
        'subtotal': this.currentOrderComponent.showSubtotal().toString(),
        'tax': this.currentOrderComponent.showLocalTax().toString(),
        'pickupLocation': this.pickupLocation,
        'firstName': this.contactInfoAndPaymentData['firstName'],
        'lastName': this.contactInfoAndPaymentData['lastName'],
        'email': this.contactInfoAndPaymentData['email'],
        'phoneNumber': this.formatPhoneNumber(this.contactInfoAndPaymentData['phoneNumber']),
        'pizzaItems': this.addEmailDisplay(localStorage.getItem("pizzaItems"), "pizza"),
        'saladItems': this.addEmailDisplay(localStorage.getItem("saladItems"), "salad"),
        'drinkItems': localStorage.getItem("drinkItems"),
        'dessertItems': localStorage.getItem("dessertItems"),
        'cardLastFourNumbers': this.showOnlyLastFourNumbers(this.contactInfoAndPaymentData['cardNumber']),
        'cardType': this.getCreditCardType(this.contactInfoAndPaymentData['cardNumber'])
      });

      this.http.post(this.backendService.getBackendURL() + 'unregistered-user/charge', {}, { headers: headers }).subscribe(resp => {
        console.log(resp);
        if (resp == null) {
          this.zone.run(() => {
            this.router.navigate(['/error-page']);
          });
        } else {
          this.zone.run(() => {
            this.router.navigate(['/order-online/thank-you']);
          });
        }
      });

      this.http.post(this.backendService.getBackendURL() + 'form-input/cancel', {}).subscribe(resp => {
        console.log(resp);
      });
      this.storageService.clear();

    }

  }

}
