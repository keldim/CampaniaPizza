import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // onSubjectForPizzaItems = new Subject<{ key: string, value: any }>();
  // onSubjectForSaladItems = new Subject<{ key: string, value: any }>();
  // onSubjectForDrinkItems = new Subject<{ key: string, value: any }>();
  // onSubjectForDessertItems = new Subject<{ key: string, value: any }>();
  // onSubjectForPickupLocation = new Subject<{ key: string, value: "" }>();

  // onSubjectForPizzaItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // onSubjectForSaladItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // onSubjectForDrinkItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // onSubjectForDessertItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  // onSubjectForPickupLocation: BehaviorSubject<String> = new BehaviorSubject<String>("");

  onSubjectForPizzaItems = new Subject<any[]>();
  onSubjectForSaladItems = new Subject<any[]>();
  onSubjectForDrinkItems = new Subject<any[]>();
  onSubjectForDessertItems = new Subject<any[]>();
  onSubjectForPickupLocation = new Subject<string>();



  constructor() {
    // this.getPizzaItems().subscribe(forStartPizza =>  this.onSubjectForPizzaItems= forStartPizza);
    // this.getSaladItems().subscribe(forStartSalad =>  this.onSubjectForSaladItems= forStartSalad);
    // this.getDrinkItems().subscribe(forStartDrink =>  this.onSubjectForDrinkItems= forStartDrink);
    // this.getDessertItems().subscribe(forStartDessert =>  this.onSubjectForDessertItems= forStartDessert);
    // this.getPickupLocation().subscribe(forStartPickup =>  this.onSubjectForPickupLocation= forStartPickup);
    // // localStorage.clear();
    // || undefined
    if (localStorage.getItem("pizzaItems") == null) {
      let emptyArray: any[] = [];
      localStorage.setItem("pizzaItems", JSON.stringify(emptyArray));
    }
    if (localStorage.getItem("saladItems") == null) {
      let emptyArray: any[] = [];
      localStorage.setItem("saladItems", JSON.stringify(emptyArray));
    }
    if (localStorage.getItem("drinkItems") == null) {
      let emptyArray: any[] = [];
      localStorage.setItem("drinkItems", JSON.stringify(emptyArray));
    }
    if (localStorage.getItem("dessertItems") == null) {
      let emptyArray: any[] = [];
      localStorage.setItem("dessertItems", JSON.stringify(emptyArray));
    }
    if (localStorage.getItem("pickupLocation") == null) {
      localStorage.setItem("pickupLocation", JSON.stringify(""));
    }
  }

  watchPizzaItems(): Observable<any[]> {
    return this.onSubjectForPizzaItems.asObservable();
  }

  watchSaladItems(): Observable<any[]> {
    return this.onSubjectForSaladItems.asObservable();
  }

  watchDrinkItems(): Observable<any[]> {
    return this.onSubjectForDrinkItems.asObservable();
  }

  watchDessertItems(): Observable<any[]> {
    return this.onSubjectForDessertItems.asObservable();
  }

  watchPickupLocation(): Observable<string> {
    return this.onSubjectForPickupLocation.asObservable();
  }

  // createPizzaItems() {
  //   let emptyArray: any[] = [];
  //   localStorage.setItem("pizzaItems", JSON.stringify(emptyArray));
  //   this.onSubjectForPizzaItems.next(emptyArray);
  // }

  // createSaladItems() {
  //   let emptyArray: any[] = [];
  //   localStorage.setItem("saladItems", JSON.stringify(emptyArray));
  //   this.onSubjectForSaladItems.next(emptyArray);
  // }

  // createDrinkItems() {
  //   let emptyArray: any[] = [];
  //   localStorage.setItem("drinkItems", JSON.stringify(emptyArray));
  //   this.onSubjectForDrinkItems.next(emptyArray);
  // }

  // createDessertItems() {
  //   let emptyArray: any[] = [];
  //   localStorage.setItem("dessertItems", JSON.stringify(emptyArray));
  //   this.onSubjectForDessertItems.next(emptyArray);
  // }

  // createPickupLocation() {
  //   localStorage.setItem("pickupLocation", "");
  //   this.onSubjectForPickupLocation.next("");
  // }

  public getPizzaItems() {
    return JSON.parse(localStorage.getItem("pizzaItems"));
  }

  public getSaladItems() {
    return JSON.parse(localStorage.getItem("saladItems"));
  }

  public getDrinkItems() {
    return JSON.parse(localStorage.getItem("drinkItems"));
  }

  public getDessertItems() {
    return JSON.parse(localStorage.getItem("dessertItems"));
  }

  public getPickupLocation() {
    return JSON.parse(localStorage.getItem("pickupLocation"));
  }

  // change subject<> to array??
  public updatePizzaItems(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForPizzaItems.next(data);
  }
  public updateSaladItems(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForSaladItems.next(data);
  }
  public updateDrinkItems(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForDrinkItems.next(data);
  }
  public updateDessertItems(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForDessertItems.next(data);
  }
  public updatePickupLocation(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubjectForPickupLocation.next(data);
  }

  public clear() {
    // localStorage.removeItem("pizzaItems");
    // localStorage.removeItem("saladItems");
    // localStorage.removeItem("drinkItems");
    // localStorage.removeItem("dessertItems");
    let emptyArray: any[] = [];
    localStorage.setItem("pizzaItems", JSON.stringify(emptyArray));
    localStorage.setItem("saladItems", JSON.stringify(emptyArray));
    localStorage.setItem("drinkItems", JSON.stringify(emptyArray));
    localStorage.setItem("dessertItems", JSON.stringify(emptyArray));
    localStorage.setItem("pickupLocation", JSON.stringify(""));
    // this.onSubjectForPizzaItems.next({ key: "pizzaItems", value: null });
    // this.onSubjectForSaladItems.next({ key: "saladItems", value: null });
    // this.onSubjectForDrinkItems.next({ key: "drinkItems", value: null });
    // this.onSubjectForDessertItems.next({ key: "dessertItems", value: null });
    this.onSubjectForPizzaItems.next(emptyArray);
    this.onSubjectForSaladItems.next(emptyArray);
    this.onSubjectForDrinkItems.next(emptyArray);
    this.onSubjectForDessertItems.next(emptyArray);
    this.onSubjectForPickupLocation.next("");
  }

}
