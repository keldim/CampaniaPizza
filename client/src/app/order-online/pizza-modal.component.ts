import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'pizza-modal',
  templateUrl: './pizza-modal.component.html',
  styleUrls: [`./pizza-modal.component.css`]
})
export class PizzaModalComponent {
  closeResult: string;
  pizzaType: string;
  @ViewChild('contentPizza') modal;
  cartItems: Object[] = [];
  pizzaForm: FormGroup;
  pizzaCheckboxes = {
    cheese: [
      { name: 'Fresh Mozzarella', selected: false },
      { name: 'Shredded Mozzarella', selected: false },
      { name: 'Parmesan', selected: false },
      { name: 'Ricotta', selected: false },
      { name: 'Blue Cheese Crumble', selected: false },
      { name: 'Asiago', selected: false },
      { name: 'Mac & Cheese', selected: false },
      { name: 'Feta', selected: false }
    ],
    veggies: [
      { name: 'Bell Peppers', selected: false },
      { name: 'Black Olives', selected: false },
      { name: 'Fresh Tomatoes', selected: false },
      { name: 'Chopped Garlic', selected: false },
      { name: 'Fresh Basil', selected: false },
      { name: 'Jalapenos', selected: false },
      { name: 'Pineapple', selected: false },
      { name: 'Red Onions', selected: false },
      { name: 'Red Peppers', selected: false },
      { name: 'Broccoli', selected: false },
      { name: 'Mushrooms', selected: false },
      { name: 'Sun-Dried Tomatoes', selected: false },
      { name: 'Kalamata Olives', selected: false },
      { name: 'Spinach', selected: false },
      { name: 'Banana Peppers', selected: false }
    ],
    meats: [
      { name: 'Bacon', selected: false },
      { name: 'Crumbled Meatballs', selected: false },
      { name: 'Grilled Chicken', selected: false },
      { name: 'Italian Sausage', selected: false },
      { name: 'Pepperoni', selected: false },
      { name: 'Canadian Bacon', selected: false },
      { name: 'Steak', selected: false }
    ],
    finishes: [
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

  constructor(private modalService: NgbModal, private fb: FormBuilder) { }






  openLg(pizzaType) {
    this.pizzaType = pizzaType;
    this.modalService.open(this.modal, { size: 'lg' });
  }

  buildCheese() {
    const arr = this.pizzaCheckboxes.cheese.map(oneCheese => {
      return this.fb.control(oneCheese.selected);
    });
    return this.fb.array(arr);
  }
  buildVeggies() {
    const arr = this.pizzaCheckboxes.veggies.map(veggie => {
      return this.fb.control(veggie.selected);
    });
    return this.fb.array(arr);
  }
  buildMeats() {
    const arr = this.pizzaCheckboxes.meats.map(meat => {
      return this.fb.control(meat.selected);
    });
    return this.fb.array(arr);
  }

  buildFinishes() {
    const arr = this.pizzaCheckboxes.finishes.map(finish => {
      return this.fb.control(finish.selected);
    });
    return this.fb.array(arr);
  }


  createTempForm() {
    const forCart = { ...this.pizzaForm.value };
    if(this.pizzaType == 'specialty') {
      delete forCart.sauce;
      delete forCart.cheese;
      delete forCart.veggies;
      delete forCart.meats;
    }
    this.cartItems.push(forCart);
  }

  resetForm() {
    this.pizzaForm.reset();
    this.pizzaForm.patchValue({
      size: "10",
      crust: "traditional",
      sauce: "marinara",
      cheese: [false, false, false, false, false, false, false, false],
      veggies: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      meats: [false, false, false, false, false, false, false],
      finishes: [false, false, false, false, false, false, false, false]
    });
    this.pizzaType = null;
  }

  ngOnInit() {
    this.pizzaForm = this.fb.group({
      size: "10",
      crust: "traditional",
      sauce: "marinara",
      cheese: this.buildCheese(),
      veggies: this.buildVeggies(),
      meats: this.buildMeats(),
      finishes: this.buildFinishes()
    });
  }

  save() {

  }

}
