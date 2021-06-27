import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgZone, NO_ERRORS_SCHEMA } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';

import { CheckoutComponent } from './checkout.component';
import { StorageService } from 'src/app/services/storage.service';
import { CurrentOrderComponent } from '../current-order.component';
import { OrderOnlineComponent } from '../order-online.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let mockRouter, mockBackendService, mockAuthService, mockStorageService, mockCurrentOrderComponent, mockOrderOnlineComponent;
  let zone;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['getPizzaItems', 'getSaladItems', 'getDrinkItems', 'getDessertItems',
      'getPickupLocation', 'watchPizzaItems', 'watchSaladItems', 'watchDrinkItems', 'watchDessertItems', 'watchPickupLocation', 'clear']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockBackendService = jasmine.createSpyObj(['getBackendURL']);
    mockCurrentOrderComponent = jasmine.createSpyObj(['showTotal', 'showSubtotal', 'showLocalTax']);
    mockOrderOnlineComponent = {
      isLoggedIn: false
    };
    mockAuthService = {
      isLoggedIn: (input: any) => { return new Promise<void>(resolve => resolve()); },
      getAccessToken: (input: any) => { return new Promise<void>(resolve => resolve()); },
      loginChanged: of()
    };
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: BackendService, useValue: mockBackendService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: StorageService, useValue: mockStorageService },
        { provide: CurrentOrderComponent, useValue: mockCurrentOrderComponent },
        { provide: OrderOnlineComponent, useValue: mockOrderOnlineComponent }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it('should send request to get contact info and payment', fakeAsync(() => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    tick();

    const request = httpTestingController.expectOne(
      {
        method: 'GET',
        url: "http://localhost:5000/form-input/ephemeral-data"
      }
    );
    request.flush({});
    // httpTestingController.verify();
  }));

  it('should send cancel request when the \'Cancel\' button is clicked', () => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockCurrentOrderComponent.showTotal.and.returnValue("0");
    mockCurrentOrderComponent.showSubtotal.and.returnValue("0");
    mockCurrentOrderComponent.showLocalTax.and.returnValue("0");
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    component.contactInfoAndPaymentData = {
      firstName: "josh",
      lastName: "lee",
      email: "random@email.com",
      phoneNumber: "1111111111",

      cardNumber: "0000000000000000",
      expGroup: {
        expMonth: "12",
        expYear: "2025"
      },
      cvc: "301"
    };
    component.currentOrderComponent = mockCurrentOrderComponent;
    fixture.detectChanges();
    fixture.debugElement.query(By.css(".left-button")).triggerEventHandler('click', {});

    const request = httpTestingController.expectOne(
      {
        method: 'POST',
        url: "http://localhost:5000/form-input/cancel"
      }
    );
    request.flush({});
    // httpTestingController.verify();
  });

  it('should send credit card charge request for registered user', fakeAsync(() => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    mockStorageService.clear.and.returnValue(null);
    zone = TestBed.get(NgZone);
    spyOn(zone, 'run').and.callFake((fn: Function) => fn());
    spyOn(localStorage, 'getItem')
      .and.returnValue("[]");
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockCurrentOrderComponent.showTotal.and.returnValue("0");
    mockCurrentOrderComponent.showSubtotal.and.returnValue("0");
    mockCurrentOrderComponent.showLocalTax.and.returnValue("0");
    mockOrderOnlineComponent.isLoggedIn = true;
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    component.contactInfoAndPaymentData = {
      firstName: "josh",
      lastName: "lee",
      email: "random@email.com",
      phoneNumber: "1111111111",

      cardNumber: "0000000000000000",
      expGroup: {
        expMonth: "12",
        expYear: "2025"
      },
      cvc: "301"
    };
    component.currentOrderComponent = mockCurrentOrderComponent;
    component.orderOnlineComponent = mockOrderOnlineComponent;
    fixture.detectChanges();
    component.chargeCard("randomToken");
    tick();

    const request = httpTestingController.expectOne(
      {
        method: 'POST',
        url: "http://localhost:5000/registered-user/charge"
      }
    );
    request.flush({});
    // httpTestingController.verify();
  }));

  it('should send credit card charge request for unregistered user', fakeAsync(() => {
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    mockStorageService.clear.and.returnValue(null);
    zone = TestBed.get(NgZone);
    spyOn(zone, 'run').and.callFake((fn: Function) => fn());
    spyOn(localStorage, 'getItem')
      .and.returnValue("[]");
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockCurrentOrderComponent.showTotal.and.returnValue("0");
    mockCurrentOrderComponent.showSubtotal.and.returnValue("0");
    mockCurrentOrderComponent.showLocalTax.and.returnValue("0");
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    component.contactInfoAndPaymentData = {
      firstName: "josh",
      lastName: "lee",
      email: "random@email.com",
      phoneNumber: "1111111111",

      cardNumber: "0000000000000000",
      expGroup: {
        expMonth: "12",
        expYear: "2025"
      },
      cvc: "301"
    };
    component.currentOrderComponent = mockCurrentOrderComponent;
    component.orderOnlineComponent = mockOrderOnlineComponent;
    fixture.detectChanges();
    component.chargeCard("randomToken");
    tick();

    const request = httpTestingController.expectOne(
      {
        method: 'POST',
        url: "http://localhost:5000/unregistered-user/charge"
      }
    );
    request.flush({});
    // httpTestingController.verify();
  }));

});
