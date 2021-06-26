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
  const buildYourOwnPizza = {
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
  const updatedBuildYourOwnPizza = {
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
  const specialtyPizza = {
    type: "BUFFALO CHICKEN",
    size: "10 Inch",
    crust: "Traditional Crust",
    finishes: [
      false, false, false, true, false, false, false, false
    ],
    price: 8.65,
    quantity: 1
  };
  const updatedSpecialtyPizza = {
    type: "BUFFALO CHICKEN",
    size: "10 Inch",
    crust: "Traditional Crust",
    finishes: [
      false, false, false, true, true, false, false, false
    ],
    price: 8.65,
    quantity: 1
  };
  const buildYourOwnSalad = {
    type: "BUILD YOUR OWN SALAD",
    greens: [
      true, false
    ],
    cheese: [
      false, true, false, false, false
    ],
    freshProduce: [
      false, false, true, false, false, false, false, false, false, false,
      false, false, false
    ],
    meats: [
      false, false, false, true, false, false, false, false
    ],

    topItOff: [
      false, false, false, false, true, false
    ],
    dressings: [
      true, false, false, false, false
    ],
    price: 8.65,
    quantity: 1
  };
  const updatedBuildYourOwnSalad = {
    type: "BUILD YOUR OWN SALAD",
    greens: [
      true, false
    ],
    cheese: [
      false, true, false, false, false
    ],
    freshProduce: [
      false, false, true, false, false, false, false, false, false, false,
      false, false, false
    ],
    meats: [
      false, false, false, true, false, false, false, false
    ],

    topItOff: [
      false, false, false, false, true, false
    ],
    dressings: [
      true, true, false, false, false
    ],
    price: 8.65,
    quantity: 1
  };
  const salad = {
    type: "CHICKEN CAESAR SALAD",
    size: "Entree",
    price: 6.95,
    quantity: 1
  };
  const updatedSalad = {
    type: "CHICKEN CAESAR SALAD",
    size: "Side",
    price: 3.95,
    quantity: 1
  };
  const drink = {
    type: "IZZE GLASS BOTTLE",
    price: 1.85,
    quantity: 1
  };
  const updatedDrink = {
    type: "IZZE GLASS BOTTLE",
    price: 1.85,
    quantity: 3
  };
  const dessert = {
    type: "Cookies",
    cookieChoice: "Chocolate Chip Cookie",
    brownieChoice: "",
    price: 1.99,
    quantity: 1
  };
  const updatedDessert = {
    type: "Cookies",
    cookieChoice: "White Macadamia Cookie",
    brownieChoice: "",
    price: 1.99,
    quantity: 1
  };

  beforeEach(() => {
    mockStorageService = jasmine.createSpyObj(['watchPizzaItems', 'watchSaladItems', 'watchDrinkItems', 'watchDessertItems', 'watchPickupLocation',
      'getPizzaItems', 'getSaladItems', 'getDrinkItems', 'getDessertItems', 'getPickupLocation', 'updatePizzaItems', 'updatePickupLocation', 'updateSaladItems',
      'updateDrinkItems', 'updateDessertItems']);
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
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array(buildYourOwnPizza))));

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

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))[0]).toEqual(buildYourOwnPizza);
  });

  it('should update the "BUILD YOUR OWN PIZZA" item in the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([buildYourOwnPizza]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array(updatedBuildYourOwnPizza))));
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

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))[0]).toEqual(updatedBuildYourOwnPizza);
  });

  it('should remove the "BUILD YOUR OWN PIZZA" item from the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([buildYourOwnPizza]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array())));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.pizzaModalComponent = new PizzaModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.pizzaModalComponent.deletePizzaItem(0);

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))).toEqual([]);
  });

  it('should add the "SPECIALTY PIZZA" item to the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array(specialtyPizza))));

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

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))[0]).toEqual(specialtyPizza);
  });

  it('should update the "SPECIALTY PIZZA" item in the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([specialtyPizza]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array(updatedSpecialtyPizza))));
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

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))[0]).toEqual(updatedSpecialtyPizza);
  });

  it('should remove the "SPECIALTY PIZZA" item from the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getPizzaItems.and.returnValue([specialtyPizza]);
    mockStorageService.updatePizzaItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("pizzaItems", JSON.stringify(new Array())));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.pizzaModalComponent = new PizzaModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.pizzaModalComponent.deletePizzaItem(0);

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("pizzaItems"))).toEqual([]);
  });

  it('should add the "BUILD YOUR OWN SALAD" item to the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getSaladItems.and.returnValue([]);
    mockStorageService.updateSaladItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("saladItems", JSON.stringify(new Array(buildYourOwnSalad))));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.saladModalComponent = new SaladModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.saladModalComponent.saladForm = new FormBuilder().group({
      type: "BUILD YOUR OWN SALAD",
      greens: [[
        true, false
      ]],
      cheese: [[
        false, true, false, false, false
      ]],
      freshProduce: [[
        false, false, true, false, false, false, false, false, false, false,
        false, false, false
      ]],
      meats: [[
        false, false, false, true, false, false, false, false
      ]],

      topItOff: [[
        false, false, false, false, true, false
      ]],
      dressings: [[
        true, false, false, false, false
      ]],
      price: 8.65,
      quantity: 1
    })
    component.saladModalComponent.createTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("saladItems"))[0]).toEqual(buildYourOwnSalad);
  });

  it('should update the "BUILD YOUR OWN SALAD" item in the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getSaladItems.and.returnValue([buildYourOwnSalad]);
    mockStorageService.updateSaladItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("saladItems", JSON.stringify(new Array(updatedBuildYourOwnSalad))));
    mockStorageService.updatePickupLocation.and.returnValue(null);

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.saladModalComponent = new SaladModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.saladModalComponent.indexForEdit = 0;
    component.saladModalComponent.saladForm = new FormBuilder().group({
      type: "BUILD YOUR OWN SALAD",
      greens: [[
        true, false
      ]],
      cheese: [[
        false, true, false, false, false
      ]],
      freshProduce: [[
        false, false, true, false, false, false, false, false, false, false,
        false, false, false
      ]],
      meats: [[
        false, false, false, true, false, false, false, false
      ]],

      topItOff: [[
        false, false, false, false, true, false
      ]],
      dressings: [[
        true, true, false, false, false
      ]],
      price: 8.65,
      quantity: 1
    })
    component.saladModalComponent.updateTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("saladItems"))[0]).toEqual(updatedBuildYourOwnSalad);
  });

  it('should remove the "BUILD YOUR OWN SALAD" item from the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getSaladItems.and.returnValue([buildYourOwnSalad]);
    mockStorageService.updateSaladItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("saladItems", JSON.stringify(new Array())));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.saladModalComponent = new SaladModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.saladModalComponent.deleteSaladItem(0);

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("saladItems"))).toEqual([]);
  });

  it('should add the salad item to the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getSaladItems.and.returnValue([]);
    mockStorageService.updateSaladItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("saladItems", JSON.stringify(new Array(salad))));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.saladModalComponent = new SaladModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.saladModalComponent.saladForm = new FormBuilder().group({
      type: "CHICKEN CAESAR SALAD",
      size: "Entree",
      price: 6.95,
      quantity: 1
    })
    component.saladModalComponent.createTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("saladItems"))[0]).toEqual(salad);
  });

  it('should update the salad item in the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getSaladItems.and.returnValue([salad]);
    mockStorageService.updateSaladItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("saladItems", JSON.stringify(new Array(updatedSalad))));
    mockStorageService.updatePickupLocation.and.returnValue(null);

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.saladModalComponent = new SaladModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.saladModalComponent.indexForEdit = 0;
    component.saladModalComponent.saladForm = new FormBuilder().group({
      type: "CHICKEN CAESAR SALAD",
      size: "Side",
      price: 3.95,
      quantity: 1
    })
    component.saladModalComponent.updateTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("saladItems"))[0]).toEqual(updatedSalad);
  });

  it('should remove the salad item from the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getSaladItems.and.returnValue([salad]);
    mockStorageService.updateSaladItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("saladItems", JSON.stringify(new Array())));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.saladModalComponent = new SaladModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.saladModalComponent.deleteSaladItem(0);

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("saladItems"))).toEqual([]);
  });

  it('should add the drink item to the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getDrinkItems.and.returnValue([]);
    mockStorageService.updateDrinkItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("drinkItems", JSON.stringify(new Array(drink))));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.drinkModalComponent = new DrinkModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.drinkModalComponent.drinkForm = new FormBuilder().group({
      type: "IZZE GLASS BOTTLE",
      price: 1.85,
      quantity: 1
    })
    component.drinkModalComponent.createTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("drinkItems"))[0]).toEqual(drink);
  });

  it('should update the drink item in the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getDrinkItems.and.returnValue([drink]);
    mockStorageService.updateDrinkItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("drinkItems", JSON.stringify(new Array(updatedDrink))));
    mockStorageService.updatePickupLocation.and.returnValue(null);

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.drinkModalComponent = new DrinkModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.drinkModalComponent.indexForEdit = 0;
    component.drinkModalComponent.drinkForm = new FormBuilder().group({
      type: "IZZE GLASS BOTTLE",
      price: 1.85,
      quantity: 3
    })
    component.drinkModalComponent.updateTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("drinkItems"))[0]).toEqual(updatedDrink);
  });

  it('should remove the drink item from the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getDrinkItems.and.returnValue([drink]);
    mockStorageService.updateDrinkItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("drinkItems", JSON.stringify(new Array())));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.drinkModalComponent = new DrinkModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.drinkModalComponent.deleteDrinkItem(0);

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("drinkItems"))).toEqual([]);
  });

  it('should add the dessert item to the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getDessertItems.and.returnValue([]);
    mockStorageService.updateDessertItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("dessertItems", JSON.stringify(new Array(dessert))));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.dessertModalComponent = new DessertModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.dessertModalComponent.dessertForm = new FormBuilder().group({
      type: "Cookies",
      cookieChoice: "Chocolate Chip Cookie",
      brownieChoice: "",
      price: 1.99,
      quantity: 1
    })
    component.dessertModalComponent.createTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("dessertItems"))[0]).toEqual(dessert);
  });

  it('should update the dessert item in the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getDessertItems.and.returnValue([dessert]);
    mockStorageService.updateDessertItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("dessertItems", JSON.stringify(new Array(updatedDessert))));
    mockStorageService.updatePickupLocation.and.returnValue(null);

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.dessertModalComponent = new DessertModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.dessertModalComponent.indexForEdit = 0;
    component.dessertModalComponent.dessertForm = new FormBuilder().group({
      type: "Cookies",
      cookieChoice: "White Macadamia Cookie",
      brownieChoice: "",
      price: 1.99,
      quantity: 1
    })
    component.dessertModalComponent.updateTempForm();

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("dessertItems"))[0]).toEqual(updatedDessert);
  });

  it('should remove the dessert item from the cart', () => {
    mockStorageService.watchPizzaItems.and.returnValue(of([]));
    mockStorageService.watchSaladItems.and.returnValue(of([]));
    mockStorageService.watchDrinkItems.and.returnValue(of([]));
    mockStorageService.watchDessertItems.and.returnValue(of([]));
    mockStorageService.watchPickupLocation.and.returnValue(of([]));
    mockStorageService.getDessertItems.and.returnValue([dessert]);
    mockStorageService.updateDessertItems.and.returnValue(LocalStorageStub.mockLocalStorage.setItem("dessertItems", JSON.stringify(new Array())));

    fixture = TestBed.createComponent(CurrentOrderComponent);
    component = fixture.componentInstance;
    component.dessertModalComponent = new DessertModalComponent(TestBed.get(NgbModal), new FormBuilder, mockStorageService);
    fixture.detectChanges();
    component.dessertModalComponent.deleteDessertItem(0);

    expect(JSON.parse(LocalStorageStub.mockLocalStorage.getItem("dessertItems"))).toEqual([]);
  });

});
