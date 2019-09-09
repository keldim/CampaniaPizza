import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCartSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  drinkItemsInCart: any[] = [];
  dessertItemsInCart: any[] = [];
  private itemsInCart: any[] = this.drinkItemsInCart.concat(this.dessertItemsInCart);


  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  public addToCart(item: any) {
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
  }

  public removeFromCart(item: any) {
    const currentItems = [...this.itemsInCart];
    currentItems.splice(currentItems.indexOf(item), 1);
    this.itemsInCartSubject.next(currentItems);
  }

  public getItems(): Observable<any[]> {
    return this.itemsInCartSubject;
  }
}
