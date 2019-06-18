import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialtyPizza } from './specialty-pizza';
import { BYOPizza } from './byo-pizza';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Item } from './item.entity';
import { PizzaModalComponent } from './pizza-modal.component';
import { DessertModalComponent } from './dessert-modal.component';

@Component({
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.css']
})
export class OrderOnlineComponent implements OnInit {
  closeResult: string;
  selectedUser: User;

  byoPizzaOrder: BYOPizza;

  @ViewChild(PizzaModalComponent) pizzaModalComponent;
  @ViewChild(DessertModalComponent) dessertModalComponent;



  constructor(private userService: UserService, private modalService: NgbModal) { }




  openPizza(pizzaType) {
    this.pizzaModalComponent.openLg(pizzaType);
  }

  openDessert(dessertType) {
    this.dessertModalComponent.openLg(dessertType);
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

  ngOnInit() {
    // this.userService.getUserByUsername('john')
    //   .subscribe(
    //     (data: User) => this.selectedUser = data,
    //     (err: any) => console.log(err)
    //   );


  }
  // get ingredients(): FormArray {
  //   return this.specialtyPizzaForm.get('ingredients') as FormArray;
  //  };

  save() {

  }

  // create order-online module?

  // reset and enter default values? use setValue, patchValue?

  // if there is at least one newly created form in the array, display the content of the array on the cart, use ngIf
  // create a json form ready to send to the server
  // read the created json form in the shopping cart for display
  // no need to convert to json form, already in json form?

  // make one form for pizza, hide sections based on pizza type? same for drink, dessert...?
  // think about how to print the orders on the cart? use Object array?

  // hide menu based on ngIf?

  // create a different form for each menu type? use formbuilder?

  // watch the rest of the angular reactive course??
  // memoirze concepts of the course for better website building skills? don't forget the FormArray struggle, despite I had difficulty
  // remembering that FormArray was covered in the course because the subject I worked on was checkbox, not dynamically duplicating input elements?

}
