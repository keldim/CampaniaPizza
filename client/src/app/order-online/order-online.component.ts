import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialtyPizza } from './specialty-pizza';
import { BYOPizza } from './byo-pizza';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.css']
})
export class OrderOnlineComponent implements OnInit {
  closeResult: string;
  selectedUser: User;
  specialtyPizzaForm: FormGroup;

  // specialtyPizzaOrder: SpecialtyPizza = {
  //   size: '10',
  //   crust: 'traditional',
  //   ingredients: []
  // };
  byoPizzaOrder: BYOPizza;

  exampleUser = {
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
    const arr = this.exampleUser.ingredients.map(ingredient => {
      return this.fb.control(ingredient.selected);
    });
    return this.fb.array(arr);
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


  // create a json form ready to send to the server
  // read the created json form in the shopping cart for display

}
