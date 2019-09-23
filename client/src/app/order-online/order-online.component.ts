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
  @LocalStorage() pickupLocation: string = "";

  @ViewChild(PizzaModalComponent) pizzaModalComponent;
  @ViewChild(DessertModalComponent) dessertModalComponent;
  @ViewChild(SaladModalComponent) saladModalComponent;
  @ViewChild(DrinkModalComponent) drinkModalComponent;


  // private userService: UserService,
  // private modalService: NgbModal,
  constructor(private fb: FormBuilder) {

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
    for(let pizzaItem of this.pizzaModalComponent.pizzaItems) {
      subtotal += pizzaItem.quantity * pizzaItem.price;
    }
    for(let saladItem of this.saladModalComponent.saladItems) {
      subtotal += saladItem.price;
    }
    for(let drinkItem of this.drinkModalComponent.drinkItems) {
      subtotal += drinkItem.price;
    }
    for(let dessertItem of this.dessertModalComponent.dessertItems) {
      subtotal += dessertItem.price;
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
    this.pickupLocation = this.orderOnlineForm.controls.location.value;
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



  // if there is at least one newly created form in the array, display the content of the array on the cart, use ngIf
  // create a json form ready to send to the server
  // read the created json form in the shopping cart for display
  // no need to convert to json form, already in json form?

  // watch the rest of the angular reactive course??
  // memoirze concepts of the course for better website building skills? don't forget the FormArray struggle, despite I had difficulty
  // remembering that FormArray was covered in the course because the subject I worked on was checkbox, not dynamically duplicating input elements?

  // important parts of the css are now copied? refer back to css from example websites for minor details now?

  // no need to remove mobile compatibility from the order-online page, looks good with it

  // add warning pop up for delete?

  // for business hours popover, connect with daily time to indicate the day? visit the ngboostrap website for more info?

  // remember to remove unnecessary files and images

}
