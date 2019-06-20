import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { OrderOnlineComponent } from './order-online.component';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'pizza-modal',
  templateUrl: './pizza-modal.component.html',
  styleUrls: [`./pizza-modal.component.css`]
})
export class PizzaModalComponent {
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
    this.pizzaForm.patchValue({
      type: pizzaType
    });
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

  // find out about how to dynamically add html?
  buildDisplayForCart(currentItem) {
    var finalString: string = "";
    // for(let item of this.pizzaItems) {
    if (currentItem.hasOwnProperty("cheese")) {
      // finalString += "BUILD YOUR OWN PIZZA\n";
      finalString += (currentItem.size + ", ");
      finalString += (currentItem.crust + ", ");
      finalString += (currentItem.sauce + ", ");
      for (let oneCheese in currentItem.cheese) {
        if (currentItem.cheese[oneCheese] != this.pizzaCheckboxes.cheese[oneCheese].selected) {
          finalString += (this.pizzaCheckboxes.cheese[oneCheese].name + ", ");
        }
      }
      for (let veggie in currentItem.veggies) {
        if (currentItem.veggies[veggie] != this.pizzaCheckboxes.veggies[veggie].selected) {
          finalString += (this.pizzaCheckboxes.veggies[veggie].name + ", ");
        }
      }
      for (let meat in currentItem.meats) {
        if (currentItem.meats[meat] != this.pizzaCheckboxes.meats[meat].selected) {
        finalString += (this.pizzaCheckboxes.meats[meat].name + ", ");
        }
      }
      for (let finish in currentItem.finishes) {
        if (currentItem.finishes[finish] != this.pizzaCheckboxes.finishes[finish].selected) {
          finalString += (this.pizzaCheckboxes.finishes[finish].name + ", ");
        }
      }
      finalString = finalString.replace(/,\s*$/, "");
      finalString += "\n";
    } else {
      // finalString += "SPECIALTY PIZZA\n"
      finalString += (currentItem.size + ", ");
      finalString += (currentItem.crust + ", ");
      for (let finish in currentItem.finishes) {
        if (currentItem.finishes[finish] != this.pizzaCheckboxes.finishes[finish].selected) {
          finalString += (this.pizzaCheckboxes.finishes[finish].name + ", ");
        }
      }
      finalString = finalString.replace(/,\s*$/, "");
      finalString += "\n";
    }
    // }
    return finalString;
  }

  get cheese(): FormArray {
    return <FormArray>this.pizzaForm.get('cheese');
  }

  get veggies(): FormArray {
    return <FormArray>this.pizzaForm.get('veggies');
  }

  get meats(): FormArray {
    return <FormArray>this.pizzaForm.get('meats');
  }

  get finishes(): FormArray {
    return <FormArray>this.pizzaForm.get('finishes');
  }

  get type(): FormControl {
    return <FormControl>this.pizzaForm.get('type');
  }



  createTempForm() {
    const forCart = { ...this.pizzaForm.value };
    if (this.pizzaForm.controls.type.value != 'Build Your Own Pizza') {
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
      type: "",
      size: "10",
      crust: "traditional",
      sauce: "marinara",
      cheese: this.buildCheese().value,
      veggies: this.buildVeggies().value,
      meats: this.buildMeats().value,
      finishes: this.buildFinishes().value
    });
  }

  ngOnInit() {
    this.pizzaForm = this.fb.group({
      type: "",
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
