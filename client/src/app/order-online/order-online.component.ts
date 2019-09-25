import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PizzaModalComponent } from './pizza-modal/pizza-modal.component';
import { DessertModalComponent } from './dessert-modal/dessert-modal.component';
import { SaladModalComponent } from './salad-modal/salad-modal.component';
import { DrinkModalComponent } from './drink-modal/drink-modal.component';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { LocalStorage } from 'ngx-store';
import { Observable, Subscription, of } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'order-online',
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.css']
})
export class OrderOnlineComponent implements OnInit {
  closeResult: string;
  selectedUser: User;
  clickedMenu: string = "Build Your Own Pizza";
  orderOnlineForm: FormGroup;
  pizzaItems: any[] = this.storageService.getPizzaItems();
  saladItems: any[] = this.storageService.getSaladItems();
  drinkItems: any[] = this.storageService.getDrinkItems();
  dessertItems: any[] = this.storageService.getDessertItems();
  pickupLocation: string = this.storageService.getPickupLocation();

  @ViewChild(PizzaModalComponent) pizzaModalComponent;
  @ViewChild(DessertModalComponent) dessertModalComponent;
  @ViewChild(SaladModalComponent) saladModalComponent;
  @ViewChild(DrinkModalComponent) drinkModalComponent;


  // private userService: UserService,
  // private modalService: NgbModal,
  constructor(private fb: FormBuilder, private storageService: StorageService) {
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

  clickedVerticalNavbar(clickedMenu) {
    this.clickedMenu = clickedMenu;
  }

  openPizza(pizzaType) {
    this.pizzaModalComponent.openLg(pizzaType);
  }

  openDessert(dessertType) {
    this.dessertModalComponent.openLg(dessertType);
  }

  openSalad(saladType) {
    this.saladModalComponent.openLg(saladType);
  }

  openDrink(drinkType) {
    this.drinkModalComponent.openLg(drinkType);
  }

  isArray(item) {
    if(item instanceof Array) {
      return true;
    }
    return false;
  }

  itemType(item) {
    if(item.hasOwnProperty("cheese")) {
      return "byo";
    }
    return "specialty";
  }

  priceTimesQuantity(quantity, price) {
    return (quantity * price).toFixed(2);
  }

  calculateSubtotal() {
    let subtotal = 0;
    for(let pizzaItem of this.pizzaItems) {
      subtotal += pizzaItem.quantity * pizzaItem.price;
    }
    for(let saladItem of this.saladItems) {
      subtotal += saladItem.quantity * saladItem.price;
    }
    for(let drinkItem of this.drinkItems) {
      subtotal += drinkItem.quantity * drinkItem.price;
    }
    for(let dessertItem of this.dessertItems) {
      subtotal += dessertItem.quantity * dessertItem.price;
    }
    return subtotal;
  }

  calculateLocalTax() {
    return this.calculateSubtotal() * 0.08875;
  }

  calculateTotal() {
    return this.calculateSubtotal() + this.calculateLocalTax();
  }

  showSubtotal() {
    return this.calculateSubtotal().toFixed(2);
  }

  showLocalTax() {
    return this.calculateLocalTax().toFixed(2);
  }

  showTotal() {
    return this.calculateTotal().toFixed(2);
  }

  get location(): FormControl {
    return <FormControl>this.orderOnlineForm.get('location');
  }

  assignLocation() {
    let updatedLocation = this.orderOnlineForm.controls.location.value;
    this.storageService.updatePickupLocation("pickupLocation", updatedLocation);
  }

  ngOnInit() {
    // this.userService.getUserByUsername('john')
    //   .subscribe(
    //     (data: User) => this.selectedUser = data,
    //     (err: any) => console.log(err)
    //   );

    this.orderOnlineForm = this.fb.group({
      location: this.pickupLocation
    });

  }

  save() {

  }

}
