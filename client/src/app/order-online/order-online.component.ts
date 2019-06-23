import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PizzaModalComponent } from './pizza-modal.component';
import { DessertModalComponent } from './dessert-modal.component';
import { SaladModalComponent } from './salad-modal.component';
import { DrinkModalComponent } from './drink-modal.component';

@Component({
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.css']
})
export class OrderOnlineComponent implements OnInit {
  closeResult: string;
  selectedUser: User;
  clickedMenu: string = "Build Your Own Pizza";


  @ViewChild(PizzaModalComponent) pizzaModalComponent;
  @ViewChild(DessertModalComponent) dessertModalComponent;
  @ViewChild(SaladModalComponent) saladModalComponent;
  @ViewChild(DrinkModalComponent) drinkModalComponent;

  constructor(private userService: UserService, private modalService: NgbModal) { }

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

  calculateSubtotal() {
    let subtotal = 0;
    for(let pizzaItem of this.pizzaModalComponent.pizzaItems) {
      subtotal += pizzaItem.price;
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

  ngOnInit() {
    // this.userService.getUserByUsername('john')
    //   .subscribe(
    //     (data: User) => this.selectedUser = data,
    //     (err: any) => console.log(err)
    //   );


  }


  save() {

  }

  // create order-online module?

  // if there is at least one newly created form in the array, display the content of the array on the cart, use ngIf
  // create a json form ready to send to the server
  // read the created json form in the shopping cart for display
  // no need to convert to json form, already in json form?

  // watch the rest of the angular reactive course??
  // memoirze concepts of the course for better website building skills? don't forget the FormArray struggle, despite I had difficulty
  // remembering that FormArray was covered in the course because the subject I worked on was checkbox, not dynamically duplicating input elements?


  // important parts of the css are now copied? refer back to css from example websites for minor details now?

  // no need to remove mobile compatibility from the order-online page, looks good with it

  // fix the look of each modal?

  // fix the radio button values and checkbox values?

  // add warning pop up for delete?

  // add prices to item rows?

  // make the checkbox and radio button bigger

  // add quantity box to each modal?

  // use service to store order-online menu data as seen on angular getting started?

  // create validation for order-online? for byo salad? for quantity?

  // make a strucutre for the items in the shopping cart? no need to use \n?

  // cart item saved, does not change on page refresh, internet cookies? internet sessions?

}
