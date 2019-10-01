import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  onSubjectForPizzaItems = new Subject<any[]>();
  onSubjectForSaladItems = new Subject<any[]>();
  onSubjectForDrinkItems = new Subject<any[]>();
  onSubjectForDessertItems = new Subject<any[]>();
  onSubjectForPickupLocation = new Subject<string>();



  constructor() {
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
    let emptyArray: any[] = [];

    localStorage.setItem("pizzaItems", JSON.stringify(emptyArray));
    localStorage.setItem("saladItems", JSON.stringify(emptyArray));
    localStorage.setItem("drinkItems", JSON.stringify(emptyArray));
    localStorage.setItem("dessertItems", JSON.stringify(emptyArray));
    localStorage.setItem("pickupLocation", JSON.stringify(""));

    this.onSubjectForPizzaItems.next(emptyArray);
    this.onSubjectForSaladItems.next(emptyArray);
    this.onSubjectForDrinkItems.next(emptyArray);
    this.onSubjectForDessertItems.next(emptyArray);
    this.onSubjectForPickupLocation.next("");
  }

}
