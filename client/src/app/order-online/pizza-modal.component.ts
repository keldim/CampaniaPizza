import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'pizza-modal',
  templateUrl: './pizza-modal.component.html',
  styleUrls: [`./pizza-modal.component.css`]
})
export class PizzaModalComponent {
  @ViewChild('contentPizza') modal;
  pizzaItems: any[] = [];
  pizzaForm: FormGroup;
  forEdit: boolean = false;
  indexForEdit: any = 0;
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
      { name: 'Finish - Signature Marinara', selected: false },
      { name: 'Finish - Spicy Sriracha Marinara', selected: false },
      { name: 'Finish - Pesto Drizzle', selected: false },
      { name: 'Finish - Smokey Bourbon BBQ', selected: false },
      { name: 'Finish - Extra Virgin Olive Oil Drizzle', selected: false },
      { name: 'Finish - Buffalo Sauce', selected: false },
      { name: 'Finish - White Sauce', selected: false },
      { name: 'Finish - Ranch', selected: false }
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

  valueBindingForEdit(index) {
    // need to get the index for the item in the pizzaItems??
    // distinguish between create and edit in createTempForm()?
    // create openPizzaForEdit()? if using openPizzaForEdit(), create a diffrent button in pizza modal?
    this.forEdit = true;
    this.indexForEdit = index;
    if (this.pizzaItems[index].type == "BUILD YOUR OWN PIZZA") {
      this.pizzaForm.patchValue({
        type: this.pizzaItems[index].type,
        size: this.pizzaItems[index].size,
        crust: this.pizzaItems[index].crust,
        sauce: this.pizzaItems[index].sauce,
        cheese: this.pizzaItems[index].cheese,
        veggies: this.pizzaItems[index].veggies,
        meats: this.pizzaItems[index].meats,
        finishes: this.pizzaItems[index].finishes,
        quantity: this.pizzaItems[index].quantity
      });
    } else {
      this.pizzaForm.patchValue({
        type: this.pizzaItems[index].type,
        size: this.pizzaItems[index].size,
        crust: this.pizzaItems[index].crust,
        finishes: this.pizzaItems[index].finishes,
        quantity: this.pizzaItems[index].quantity
      });
    }
  }

  updateTempForm() {
    if (this.pizzaForm.controls.type.value != 'BUILD YOUR OWN PIZZA') {
      this.pizzaItems[this.indexForEdit].type = this.pizzaForm.controls.type.value;
      this.pizzaItems[this.indexForEdit].size = this.pizzaForm.controls.size.value;
      this.pizzaItems[this.indexForEdit].crust = this.pizzaForm.controls.crust.value;
      this.pizzaItems[this.indexForEdit].finishes = this.pizzaForm.controls.finishes.value;

      const noLeadingZero = parseInt(this.pizzaForm.controls.quantity.value, 10);
      this.pizzaItems[this.indexForEdit].quantity = noLeadingZero;
    } else {
      this.pizzaItems[this.indexForEdit].type = this.pizzaForm.controls.type.value;
      this.pizzaItems[this.indexForEdit].size = this.pizzaForm.controls.size.value;
      this.pizzaItems[this.indexForEdit].crust = this.pizzaForm.controls.crust.value;
      this.pizzaItems[this.indexForEdit].sauce = this.pizzaForm.controls.sauce.value;
      this.pizzaItems[this.indexForEdit].cheese = this.pizzaForm.controls.cheese.value;
      this.pizzaItems[this.indexForEdit].veggies = this.pizzaForm.controls.veggies.value;
      this.pizzaItems[this.indexForEdit].meats = this.pizzaForm.controls.meats.value;
      this.pizzaItems[this.indexForEdit].finishes = this.pizzaForm.controls.finishes.value;
      this.pizzaItems[this.indexForEdit].quantity = this.pizzaForm.controls.quantity.value;

      const noLeadingZero = parseInt(this.pizzaForm.controls.quantity.value, 10);
      this.pizzaItems[this.indexForEdit].quantity = noLeadingZero;
    }
    this.forEdit = false;
    this.indexForEdit = 0;
  }

  resetEdit() {
    this.forEdit = false;
    this.indexForEdit = 0;
  }

  deletePizzaItem(index) {
    this.pizzaItems.splice(index, 1);
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

  get quantity(): FormControl {
    return <FormControl>this.pizzaForm.get('quantity');
  }

  sizeRadioClicking(selectedValue) {
    this.pizzaForm.patchValue({
      size: selectedValue
    });
  }

  crustRadioClicking(selectedValue) {
    this.pizzaForm.patchValue({
      crust: selectedValue
    });
  }

  sauceRadioClicking(selectedValue) {
    this.pizzaForm.patchValue({
      sauce: selectedValue
    });
  }

  oneCheeseBoxClicking(index) {
    if (this.pizzaForm.controls.cheese.value[index]) {
      var replacement: any[] = [...this.pizzaForm.controls.cheese.value];
      replacement[index] = false;
      this.pizzaForm.patchValue({
        cheese: replacement
      });
    } else {
      var replacement: any[] = [...this.pizzaForm.controls.cheese.value];
      replacement[index] = true;
      this.pizzaForm.patchValue({
        cheese: replacement
      });
    }
  }

  veggieBoxClicking(index) {
    if (this.pizzaForm.controls.veggies.value[index]) {
      var replacement: any[] = [...this.pizzaForm.controls.veggies.value];
      replacement[index] = false;
      this.pizzaForm.patchValue({
        veggies: replacement
      });
    } else {
      var replacement: any[] = [...this.pizzaForm.controls.veggies.value];
      replacement[index] = true;
      this.pizzaForm.patchValue({
        veggies: replacement
      });
    }
  }

  meatBoxClicking(index) {
    if (this.pizzaForm.controls.meats.value[index]) {
      var replacement: any[] = [...this.pizzaForm.controls.meats.value];
      replacement[index] = false;
      this.pizzaForm.patchValue({
        meats: replacement
      });
    } else {
      var replacement: any[] = [...this.pizzaForm.controls.meats.value];
      replacement[index] = true;
      this.pizzaForm.patchValue({
        meats: replacement
      });
    }
  }

  finishBoxClicking(index) {
    if (this.pizzaForm.controls.finishes.value[index]) {
      var replacement: any[] = [...this.pizzaForm.controls.finishes.value];
      replacement[index] = false;
      this.pizzaForm.patchValue({
        finishes: replacement
      });
    } else {
      var replacement: any[] = [...this.pizzaForm.controls.finishes.value];
      replacement[index] = true;
      this.pizzaForm.patchValue({
        finishes: replacement
      });
    }
  }

  createTempForm() {
    const noLeadingZero = parseInt(this.pizzaForm.controls.quantity.value, 10);
    this.pizzaForm.patchValue({
      quantity: noLeadingZero
    });
    const forCart = { ...this.pizzaForm.value };
    if (this.pizzaForm.controls.type.value != 'BUILD YOUR OWN PIZZA') {
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
    size: "10 Inch",
    crust: "Traditional Crust",
    sauce: "Signature Marinara",
    cheese: this.buildCheese().value,
    veggies: this.buildVeggies().value,
    meats: this.buildMeats().value,
    finishes: this.buildFinishes().value,
    price: 8.65,
    quantity: 1
  });
}

ngOnInit() {
  this.pizzaForm = this.fb.group({
    type: "",
    size: "10 Inch",
    crust: "Traditional Crust",
    sauce: "Signature Marinara",
    cheese: this.buildCheese(),
    veggies: this.buildVeggies(),
    meats: this.buildMeats(),
    finishes: this.buildFinishes(),
    price: 8.65,
    quantity: [1, [Validators.required, Validators.min(1), Validators.max(99)]]
  });
}

save() {

}

}
