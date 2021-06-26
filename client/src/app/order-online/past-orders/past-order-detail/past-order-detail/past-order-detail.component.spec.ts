import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PastOrderDetailComponent } from './past-order-detail.component';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { DrinkModalComponent } from 'src/app/order-online/drink-modal/drink-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DessertModalComponent } from 'src/app/order-online/dessert-modal/dessert-modal.component';
import { SaladModalComponent } from 'src/app/order-online/salad-modal/salad-modal.component';
import { PizzaModalComponent } from 'src/app/order-online/pizza-modal/pizza-modal.component';
import { LocalStorageStub } from 'src/app/services/local-storage-stub';
import { of } from 'rxjs';

describe('PastOrderDetailComponent', () => {
  let component: PastOrderDetailComponent;
  let fixture: ComponentFixture<PastOrderDetailComponent>;
  let mockAuthService, mockActivatedRoute, mockRouter, mockBackendService, mockStorageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['getAccessToken']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = {
      snapshot: { params: { id: 3 } }
    };
    mockBackendService = jasmine.createSpyObj(['getBackendURL']);
    mockStorageService = jasmine.createSpyObj(['clear', 'watchPizzaItems', 'watchSaladItems', 'watchDrinkItems', 'watchDessertItems',
    'watchPickupLocation', 'getPizzaItems', 'getSaladItems', 'getDrinkItems', 'getDessertItems', 'getPickupLocation', 'updatePizzaItems',
    'updatePickupLocation', 'updateSaladItems', 'updateDrinkItems', 'updateDessertItems']);
    TestBed.configureTestingModule({
      declarations: [PastOrderDetailComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: BackendService, useValue: mockBackendService },
        { provide: StorageService, useValue: mockStorageService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it('should send request for past order', fakeAsync(() => {
    mockAuthService.getAccessToken.and.returnValue(
      new Promise<void>(resolve => resolve())
    );
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(PastOrderDetailComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    tick();

    const request = httpTestingController.expectOne(
      {
        method: 'POST',
        url: "http://localhost:5000/registered-user/past-order/3"
      }
    );
    request.flush({});
    httpTestingController.verify();
  }));

  it('should fill up the cart with items from the past order', fakeAsync(() => {
    mockAuthService.getAccessToken.and.returnValue(
      new Promise<void>(resolve => resolve())
    );
    mockBackendService.getBackendURL.and.returnValue("http://localhost:5000/");
    const pastOrder = {
      pizzaItems: [{
        type: "BUILD YOUR OWN PIZZA",
        size: "10 Inch",
        crust: "Traditional Crust",
        sauce: "Signature Marinara",
        cheese: JSON.stringify([
          true, false, false, false, false, false, false, false
        ]),
        veggies: JSON.stringify([
          false, true, false, false, false, false, false, false, false, false, false, false, false, false, false
        ]),
        meats: JSON.stringify([
          false, false, true, false, false, false, false,
        ]),
        finishes: JSON.stringify([
          false, false, false, true, false, false, false, false
        ]),
        price: 8.65,
        quantity: 1
      }],
      saladItems: [{
        type: "BUILD YOUR OWN SALAD",
        greens: JSON.stringify([
          true, false
        ]),
        cheese: JSON.stringify([
          false, true, false, false, false
        ]),
        freshProduce: JSON.stringify([
          false, false, true, false, false, false, false, false, false, false,
          false, false, false
        ]),
        meats: JSON.stringify([
          false, false, false, true, false, false, false, false
        ]),

        topItOff: JSON.stringify([
          false, false, false, false, true, false
        ]),
        dressings: JSON.stringify([
          true, false, false, false, false
        ]),
        price: 8.65,
        quantity: 1
      }],
      drinkItems: [{
        type: "IZZE GLASS BOTTLE",
        price: 1.85,
        quantity: 1
      }],
      dessertItems: [{
        type: "Cookies",
        cookieChoice: "Chocolate Chip Cookie",
        brownieChoice: "",
        price: 1.99,
        quantity: 1
      }]
    }
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.clear.and.returnValue(null);
    mockStorageService.getPizzaItems.and.returnValue([]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(pastOrder.pizzaItems)));
    mockStorageService.getSaladItems.and.returnValue([]);
    mockStorageService.updateSaladItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("saladItems", JSON.stringify(pastOrder.saladItems)));
    mockStorageService.getDrinkItems.and.returnValue([]);
    mockStorageService.updateDrinkItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("drinkItems", JSON.stringify(pastOrder.drinkItems)));
    mockStorageService.getDessertItems.and.returnValue([]);
    mockStorageService.updateDessertItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("dessertItems", JSON.stringify(pastOrder.dessertItems)));
    mockStorageService.updatePickupLocation.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pickupLocation", "Chelsea"));
    mockRouter.navigate.and.returnValue(null);

    fixture = TestBed.createComponent(PastOrderDetailComponent);
    component = fixture.componentInstance;
    component.pizzaModalComponent = new PizzaModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    component.saladModalComponent = new SaladModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    component.drinkModalComponent = new DrinkModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    component.dessertModalComponent = new DessertModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges()
    component.pastOrder = pastOrder;
    component.pizzaModalComponent.ngOnInit();
    component.saladModalComponent.ngOnInit();
    component.drinkModalComponent.ngOnInit();
    component.dessertModalComponent.ngOnInit();
    component.reorder();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))).toEqual(pastOrder.pizzaItems);
    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("saladItems"))).toEqual(pastOrder.saladItems);
    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("drinkItems"))).toEqual(pastOrder.drinkItems);
    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("dessertItems"))).toEqual(pastOrder.dessertItems);
    expect(LocalStorageStub.mockLocalStorage.getItem("pickupLocation")).toEqual("Chelsea");
  }));
});
