import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderOnlineComponent } from './order-online.component';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'pizza-modal',
  templateUrl: './pizza-modal.component.html',
  styleUrls: [`./pizza-modal.component.css`]
})
export class PizzaModalComponent {
  pizzaType: string;
  @ViewChild('contentPizza') modal;
  pizzaItems: any[] = [];
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

// create other modals?
// fix the error on pizza modal component? watch angular course?

// find out about how to dynamically add html?
  buildDisplayForCart() {
    var finalString: string = "";
    for(let item of this.pizzaItems) {
      if(item.hasOwnProperty("cheese")) {
        finalString += "BUILD YOUR OWN PIZZA\n"
        finalString += (item.size + ", ");
        finalString += (item.crust + ", ");
        finalString += (item.sauce + ", ");
        for(let oneCheese of item.cheese) {
          finalString += (oneCheese + ", ");
        }
        for(let veggie of item.veggies) {
          finalString += (veggie + ", ");
        }
        for(let meat of item.meats) {
          finalString += (meat + ", ");
        }
        for(let finish of item.finishes) {
          finalString += (finish + ", ");
        }
        finalString = finalString.replace(/,\s*$/, "");
        finalString += "\n";
      } else {
        finalString += "SPECIALTY PIZZA\n"
        finalString += (item.size + ", ");
        finalString += (item.crust + ", ");
        for(let finish of item.finishes) {
          finalString += (finish + ", ");
        }
        finalString = finalString.replace(/,\s*$/, "");
        finalString += "\n";
      }
    }
    return finalString;
  }



  createTempForm() {
    const forCart = { ...this.pizzaForm.value };
    if(this.pizzaType == 'specialty') {
      delete forCart.sauce;
      delete forCart.cheese;
      delete forCart.veggies;
      delete forCart.meats;
    }
    this.pizzaItems.push(forCart);
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
