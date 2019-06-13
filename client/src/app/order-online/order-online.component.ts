import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialtyPizza } from './specialty-pizza';
import { BYOPizza } from './byo-pizza';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Item } from './item.entity';

@Component({
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.css']
})
export class OrderOnlineComponent implements OnInit {
  closeResult: string;
  selectedUser: User;
  specialtyPizzaForm: FormGroup;
  byoPizzaOrder: BYOPizza;
  cartItems: Object[] = [];

  specialtyPizzaCheckboxes = {
    ingredients: [
      { name: 'Signature Marinara', selected: false },
      { name: 'Spicy Sriracha Marinara', selected: false },
      { name: 'Pesto Drizzle', selected: false },
      { name: 'Smokey Bourbon BBQ', selected: false },
      { name: 'Extra Virgin Olive Oil Drizzle', selected: false },
      { name: 'Buffalo Sauce', selected: false },
      { name: 'White Sauce', selected: false },
      { name: 'Ranch', selected: false }
    ]
  };


  constructor(private userService: UserService, private modalService: NgbModal, private fb: FormBuilder) { }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  buildIngredients() {
    const arr = this.specialtyPizzaCheckboxes.ingredients.map(ingredient => {
      return this.fb.control(ingredient.selected);
    });
    return this.fb.array(arr);
  }


  // if there is at least one newly created form in the array, display the content of the array on the cart, use ngIf
  // create a json form ready to send to the server
  // read the created json form in the shopping cart for display
  // no need to convert to json form, already in json form?

  // make one form for pizza, hide sections based on pizza type? same for drink, dessert...?
  // think about how to print the orders on the cart? use Item array?
  // for item, create variables for pizza, dessert, salad...

  createTempForm() {
      const forCart = {...this.specialtyPizzaForm.value};
      this.cartItems.push(forCart);
  }


  ngOnInit() {
    // this.userService.getUserByUsername('john')
    //   .subscribe(
    //     (data: User) => this.selectedUser = data,
    //     (err: any) => console.log(err)
    //   );
    this.specialtyPizzaForm = this.fb.group({
      size: "10",
      crust: "traditional",
      ingredients: this.buildIngredients()
    });

  }
  // get ingredients(): FormArray {
  //   return this.specialtyPizzaForm.get('ingredients') as FormArray;
  //  };

  save() {

  }

  // hide menu based on ngIf?

  // create a different form for each menu type? use formbuilder?

  // watch the rest of the angular reactive course??
  // memoirze concepts of the course for better website building skills? don't forget the FormArray struggle, despite I had difficulty
  // remembering that FormArray was covered in the course because the subject I worked on was checkbox, not dynamically duplicating input elements?

}
