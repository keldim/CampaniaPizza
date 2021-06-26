import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { LocalStorageStub } from '../services/local-storage-stub';
import { StorageService } from '../services/storage.service';
import { CurrentOrderComponent } from './current-order.component';

import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { SaladModalComponent } from './salad-modal/salad-modal.component';
import { DrinkModalComponent } from './drink-modal/drink-modal.component';
import { DessertModalComponent } from './dessert-modal/dessert-modal.component';
import { PizzaModalComponent } from './pizza-modal/pizza-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('CurrentOrderComponent', () => {
  let component: CurrentOrderComponent;
  let fixture: ComponentFixture<CurrentOrderComponent>;
  let mockStorageService;

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['watchPizzaItems', 'watchSaladItems', 'watchDrinkItems', 'watchDessertItems', 'watchPickupLocation',
      'getPizzaItems', 'getSaladItems', 'getDrinkItems', 'getDessertItems', 'getPickupLocation', 'updatePizzaItems', 'updatePickupLocation']);
    TestBed.configureTestingModule({
      declarations: [CurrentOrderComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [
        { provide: StorageService, useValue: mockStorageService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  });

  it('should add the "BUILD YOUR OWN PIZZA" item to the cart', () => {
    const pizzaToBeAdded = {
      type: "BUILD YOUR OWN PIZZA",
      size: "10 Inch",
      crust: "Traditional Crust",
      sauce: "Signature Marinara",
      cheese: [
        true, false, false, false, false, false, false, false
      ],
      veggies: [
        false, true, false, false, false, false, false, false, false, false, false, false, false, false, false
      ],
      meats: [
        false, false, true, false, false, false, false,
      ],
      finishes: [
        false, false, false, true, false, false, false, false
      ],
      price: 8.65,
      quantity: 1
    };
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array(pizzaToBeAdded))));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.pizzaModalComponent = new PizzaModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.pizzaModalComponent.pizzaForm = new FormBuilder().group({
      type: "BUILD YOUR OWN PIZZA",
      size: "10 Inch",
      crust: "Traditional Crust",
      sauce: "Signature Marinara",
      cheese: [[
        true, false, false, false, false, false, false, false
      ]],
      veggies: [[
        false, true, false, false, false, false, false, false, false, false, false, false, false, false, false
      ]],
      meats: [[
        false, false, true, false, false, false, false,
      ]],
      finishes: [[
        false, false, false, true, false, false, false, false
      ]],
      price: 8.65,
      quantity: 1
    })
    component.pizzaModalComponent.createTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))[0]).toEqual(pizzaToBeAdded);

      // pizzamodal
    // updatetempform
    // deletepizzaitem
    // createtempform
  });

  it('should update the "BUILD YOUR OWN PIZZA" item in the cart', () => {
    const originalPizza = {
      type: "BUILD YOUR OWN PIZZA",
      size: "10 Inch",
      crust: "Traditional Crust",
      sauce: "Signature Marinara",
      cheese: [
        true, false, false, false, false, false, false, false
      ],
      veggies: [
        false, true, false, false, false, false, false, false, false, false, false, false, false, false, false
      ],
      meats: [
        false, false, true, false, false, false, false,
      ],
      finishes: [
        false, false, false, true, false, false, false, false
      ],
      price: 8.65,
      quantity: 1
    };
    const updatedPizza = {
      type: "BUILD YOUR OWN PIZZA",
      size: "10 Inch",
      crust: "Traditional Crust",
      sauce: "Signature Marinara",
      cheese: [
        true, false, false, false, false, false, false, false
      ],
      veggies: [
        false, true, false, false, false, false, false, false, false, false, false, false, false, false, false
      ],
      meats: [
        false, false, true, false, false, false, false,
      ],
      finishes: [
        false, false, true, true, false, false, false, false
      ],
      price: 8.65,
      quantity: 1
    };
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([originalPizza]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array(updatedPizza))));
    mockStorageService.updatePickupLocation.and.returnValue(null);

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.pizzaModalComponent = new PizzaModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.pizzaModalComponent.indexForEdit = 0;
    component.pizzaModalComponent.pizzaForm = new FormBuilder().group({
      type: "BUILD YOUR OWN PIZZA",
      size: "10 Inch",
      crust: "Traditional Crust",
      sauce: "Signature Marinara",
      cheese: [[
        true, false, false, false, false, false, false, false
      ]],
      veggies: [[
        false, true, false, false, false, false, false, false, false, false, false, false, false, false, false
      ]],
      meats: [[
        false, false, true, false, false, false, false,
      ]],
      finishes: [[
        false, false, true, true, false, false, false, false
      ]],
      price: 8.65,
      quantity: 1
    })
    component.pizzaModalComponent.updateTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))[0]).toEqual(updatedPizza);
  });

  it('should remove the "BUILD YOUR OWN PIZZA" item from the cart', () => {
    const pizzaToBeDeleted = {
      type: "BUILD YOUR OWN PIZZA",
      size: "10 Inch",
      crust: "Traditional Crust",
      sauce: "Signature Marinara",
      cheese: [
        true, false, false, false, false, false, false, false
      ],
      veggies: [
        false, true, false, false, false, false, false, false, false, false, false, false, false, false, false
      ],
      meats: [
        false, false, true, false, false, false, false,
      ],
      finishes: [
        false, false, false, true, false, false, false, false
      ],
      price: 8.65,
      quantity: 1
    };
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([pizzaToBeDeleted]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array())));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.pizzaModalComponent = new PizzaModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.pizzaModalComponent.deletePizzaItem(0);

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))).toEqual([]);
  });

  it('should add the "SPECIALTY PIZZA" item to the cart', () => {
    const pizzaToBeAdded = {
      type: "BUFFALO CHICKEN",
      size: "10 Inch",
      crust: "Traditional Crust",
      finishes: [
        false, false, false, true, false, false, false, false
      ],
      price: 8.65,
      quantity: 1
    };
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array(pizzaToBeAdded))));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.pizzaModalComponent = new PizzaModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.pizzaModalComponent.pizzaForm = new FormBuilder().group({
      type: "BUFFALO CHICKEN",
      size: "10 Inch",
      crust: "Traditional Crust",
      finishes: [
        false, false, false, true, false, false, false, false
      ],
      price: 8.65,
      quantity: 1
    })
    component.pizzaModalComponent.createTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))[0]).toEqual(pizzaToBeAdded);
  });

  it('should update the "SPECIALTY PIZZA" item in the cart', () => {
    const originalPizza = {
      type: "BUFFALO CHICKEN",
      size: "10 Inch",
      crust: "Traditional Crust",
      finishes: [
        false, false, false, true, false, false, false, false
      ],
      price: 8.65,
      quantity: 1
    };
    const updatedPizza = {
      type: "BUFFALO CHICKEN",
      size: "10 Inch",
      crust: "Traditional Crust",
      finishes: [
        false, false, false, true, true, false, false, false
      ],
      price: 8.65,
      quantity: 1
    };
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([originalPizza]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array(updatedPizza))));
    mockStorageService.updatePickupLocation.and.returnValue(null);

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.pizzaModalComponent = new PizzaModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.pizzaModalComponent.indexForEdit = 0;
    component.pizzaModalComponent.pizzaForm = new FormBuilder().group({
      type: "BUFFALO CHICKEN",
      size: "10 Inch",
      crust: "Traditional Crust",
      finishes: [
        false, false, false, true, true, false, false, false
      ],
      price: 8.65,
      quantity: 1
    })
    component.pizzaModalComponent.updateTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))[0]).toEqual(updatedPizza);
  });

  it('should remove the "SPECIALTY PIZZA" item from the cart', () => {
    const pizzaToBeDeleted = {
      type: "BUFFALO CHICKEN",
      size: "10 Inch",
      crust: "Traditional Crust",
      finishes: [
        false, false, false, true, false, false, false, false
      ],
      price: 8.65,
      quantity: 1
    };
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([pizzaToBeDeleted]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array())));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.pizzaModalComponent = new PizzaModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.pizzaModalComponent.deletePizzaItem(0);

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))).toEqual([]);
  });

});
