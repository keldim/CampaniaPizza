import { ViewChild, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, AbstractControl, Validators, Form } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BuildYourOwnCheckboxes } from '../build-your-own-checkboxes';
import { LocalStorage } from 'ngx-store';


function oneCheckbox(c: AbstractControl): { [key: string]: boolean } | null {
  if(c.value != null && !c.value.includes(true)) {
      return { 'oneBox': true };
  }
  return null;
}


@Component({
  selector: 'salad-modal',
  templateUrl: './salad-modal.component.html',
  styleUrls: [`./salad-modal.component.css`]
})
export class SaladModalComponent {
  @ViewChild('contentSalad') modal;
  @LocalStorage() saladItems: any[] = [];
  saladForm: FormGroup;
  forEdit: boolean = false;
  indexForEdit: any = 0;
  saladCheckboxes = BuildYourOwnCheckboxes.saladItems;

  constructor(private modalService: NgbModal, private fb: FormBuilder) { }



  openLg(saladType) {
    if(saladType == 'BUILD YOUR OWN SALAD') {
      this.saladForm.patchValue({
        type: saladType
      });
    } else {
      this.saladForm.patchValue({
        type: saladType,
        greens: [true],
        freshProduce: [true]
      });
    }
    this.saladForm.patchValue({
      type: saladType
    });
    this.modalService.open(this.modal, { size: 'lg' });
  }

  get type(): FormControl {
    return <FormControl>this.saladForm.get('type');
  }

  buildGreens() {
    const arr = this.saladCheckboxes.greens.map(green => {
      return this.fb.control(green.selected);
    });
    return this.fb.array(arr, oneCheckbox);
  }

  buildCheese() {
    const arr = this.saladCheckboxes.cheese.map(oneCheese => {
      return this.fb.control(oneCheese.selected);
    });
    return this.fb.array(arr);
  }

  buildFreshProduce() {
    const arr = this.saladCheckboxes.freshProduce.map(oneFreshProduce => {
      return this.fb.control(oneFreshProduce.selected);
    });
    return this.fb.array(arr, oneCheckbox);
  }

  buildMeats() {
    const arr = this.saladCheckboxes.meats.map(meat => {
      return this.fb.control(meat.selected);
    });
    return this.fb.array(arr);
  }



  buildTopItOff() {
    const arr = this.saladCheckboxes.topItOff.map(oneTopItOff => {
      return this.fb.control(oneTopItOff.selected);
    });
    return this.fb.array(arr);
  }

  buildDressings() {
    const arr = this.saladCheckboxes.dressings.map(dressing => {
      return this.fb.control(dressing.selected);
    });
    return this.fb.array(arr);
  }

  valueBindingForEdit(index) {
    // need to get the index for the item in the pizzaItems??
    // distinguish between create and edit in createTempForm()?
    // create openPizzaForEdit()? if using openPizzaForEdit(), create a diffrent button in pizza modal?
    this.forEdit = true;
    this.indexForEdit = index;
    if (this.saladItems[index].type == "BUILD YOUR OWN SALAD") {
      this.saladForm.patchValue({
        type: this.saladItems[index].type,
        greens: this.saladItems[index].greens,
        cheese: this.saladItems[index].cheese,
        freshProduce: this.saladItems[index].freshProduce,
        meats: this.saladItems[index].meats,
        topItOff: this.saladItems[index].topItOff,
        dressings: this.saladItems[index].dressings,
        quantity: this.saladItems[index].quantity
      });
    } else {
      this.saladForm.patchValue({
        type: this.saladItems[index].type,
        size: this.saladItems[index].size,
        quantity: this.saladItems[index].quantity
      });
    }
  }

  updateTempForm() {
    if (this.saladForm.controls.type.value == "BUILD YOUR OWN SALAD") {
      this.saladItems[this.indexForEdit].type = this.saladForm.controls.type.value;
      this.saladItems[this.indexForEdit].greens = this.saladForm.controls.greens.value;
      this.saladItems[this.indexForEdit].cheese = this.saladForm.controls.cheese.value;
      this.saladItems[this.indexForEdit].freshProduce = this.saladForm.controls.freshProduce.value;
      this.saladItems[this.indexForEdit].meats = this.saladForm.controls.meats.value;
      this.saladItems[this.indexForEdit].topItOff = this.saladForm.controls.topItOff.value;
      this.saladItems[this.indexForEdit].dressings = this.saladForm.controls.dressings.value;

      const noLeadingZero = parseInt(this.saladForm.controls.quantity.value, 10);
      this.saladItems[this.indexForEdit].quantity = noLeadingZero;
    } else {
      this.saladItems[this.indexForEdit].type = this.saladForm.controls.type.value;
      this.saladItems[this.indexForEdit].size = this.saladForm.controls.size.value;
      if (this.saladForm.controls.size.value == "Entree") {
        this.saladItems[this.indexForEdit].price = 6.95;
      } else {
        this.saladItems[this.indexForEdit].price = 3.95;
      }
      const noLeadingZero = parseInt(this.saladForm.controls.quantity.value, 10);
      this.saladItems[this.indexForEdit].quantity = noLeadingZero;
    }
    this.forEdit = false;
    this.indexForEdit = 0;
    this.saladItems = this.saladItems;
  }

  resetEdit() {
    this.forEdit = false;
    this.indexForEdit = 0;
  }

  deleteSaladItem(index) {
    this.saladItems.splice(index, 1);
  }



  buildDisplayForCart(currentItem) {
    var finalString: string = "";

    // for(let item of this.saladItems) {
    if (currentItem.hasOwnProperty("greens")) {
      // finalString += "BUILD YOUR OWN SALAD\n"

      for (let green in currentItem.greens) {
        if (currentItem.greens[green] != this.saladCheckboxes.greens[green].selected) {
          finalString += (this.saladCheckboxes.greens[green].name + ", ");
        }
      }
      for (let oneCheese in currentItem.cheese) {
        if (currentItem.cheese[oneCheese] != this.saladCheckboxes.cheese[oneCheese].selected) {
          finalString += (this.saladCheckboxes.cheese[oneCheese].name + ", ");
        }
      }
      for (let oneFreshProduce in currentItem.freshProduce) {
        if (currentItem.freshProduce[oneFreshProduce] != this.saladCheckboxes.freshProduce[oneFreshProduce].selected) {
          finalString += (this.saladCheckboxes.freshProduce[oneFreshProduce].name + ", ");
        }
      }
      for (let meat in currentItem.meats) {
        if (currentItem.meats[meat] != this.saladCheckboxes.meats[meat].selected) {
          finalString += (this.saladCheckboxes.meats[meat].name + ", ");
        }
      }
      for (let oneTopItOff in currentItem.topItOff) {
        if (currentItem.topItOff[oneTopItOff] != this.saladCheckboxes.topItOff[oneTopItOff].selected) {
          finalString += (this.saladCheckboxes.topItOff[oneTopItOff].name + ", ");
        }
      }
      for (let dressing in currentItem.dressings) {
        if (currentItem.dressings[dressing] != this.saladCheckboxes.dressings[dressing].selected) {
          finalString += (this.saladCheckboxes.dressings[dressing].name + ", ");
        }
      }
      finalString = finalString.replace(/,\s*$/, "");
    } else {
      if (currentItem.size == "Entree") {
        finalString += "Entree"
      } else {
        finalString += "Side"
      }
    }
    // }
    return finalString;
  }

  get greens(): FormArray {
    return <FormArray>this.saladForm.get('greens');
  }

  get cheese(): FormArray {
    return <FormArray>this.saladForm.get('cheese');
  }

  get freshProduce(): FormArray {
    return <FormArray>this.saladForm.get('freshProduce');
  }

  get meats(): FormArray {
    return <FormArray>this.saladForm.get('meats');
  }

  get topItOff(): FormArray {
    return <FormArray>this.saladForm.get('topItOff');
  }

  get dressings(): FormArray {
    return <FormArray>this.saladForm.get('dressings');
  }

  get quantity(): FormControl {
    return <FormControl>this.saladForm.get('quantity');
  }

  greenBoxClicking(index) {
    if (this.saladForm.controls.greens.value[index]) {
      var replacement: any[] = [...this.saladForm.controls.greens.value];
      replacement[index] = false;
      this.saladForm.patchValue({
        greens: replacement
      });
    } else {
      var replacement: any[] = [...this.saladForm.controls.greens.value];
      replacement[index] = true;
      this.saladForm.patchValue({
        greens: replacement
      });
    }
  }

  oneCheeseBoxClicking(index) {
    if (this.saladForm.controls.cheese.value[index]) {
      var replacement: any[] = [...this.saladForm.controls.cheese.value];
      replacement[index] = false;
      this.saladForm.patchValue({
        cheese: replacement
      });
    } else {
      var replacement: any[] = [...this.saladForm.controls.cheese.value];
      replacement[index] = true;
      this.saladForm.patchValue({
        cheese: replacement
      });
    }
  }

  oneFreshProduceBoxClicking(index) {
    if (this.saladForm.controls.freshProduce.value[index]) {
      var replacement: any[] = [...this.saladForm.controls.freshProduce.value];
      replacement[index] = false;
      this.saladForm.patchValue({
        freshProduce: replacement
      });
    } else {
      var replacement: any[] = [...this.saladForm.controls.freshProduce.value];
      replacement[index] = true;
      this.saladForm.patchValue({
        freshProduce: replacement
      });
    }
  }

  meatBoxClicking(index) {
    if (this.saladForm.controls.meats.value[index]) {
      var replacement: any[] = [...this.saladForm.controls.meats.value];
      replacement[index] = false;
      this.saladForm.patchValue({
        meats: replacement
      });
    } else {
      var replacement: any[] = [...this.saladForm.controls.meats.value];
      replacement[index] = true;
      this.saladForm.patchValue({
        meats: replacement
      });
    }
  }

  oneTopItOffBoxClicking(index) {
    if (this.saladForm.controls.topItOff.value[index]) {
      var replacement: any[] = [...this.saladForm.controls.topItOff.value];
      replacement[index] = false;
      this.saladForm.patchValue({
        topItOff: replacement
      });
    } else {
      var replacement: any[] = [...this.saladForm.controls.topItOff.value];
      replacement[index] = true;
      this.saladForm.patchValue({
        topItOff: replacement
      });
    }
  }

  dressingBoxClicking(index) {
    if (this.saladForm.controls.dressings.value[index]) {
      var replacement: any[] = [...this.saladForm.controls.dressings.value];
      replacement[index] = false;
      this.saladForm.patchValue({
        dressings: replacement
      });
    } else {
      var replacement: any[] = [...this.saladForm.controls.dressings.value];
      replacement[index] = true;
      this.saladForm.patchValue({
        dressings: replacement
      });
    }
  }

  sizeRadioClicking(selectedValue) {
    this.saladForm.patchValue({
      size: selectedValue
    });
  }


  createTempForm() {
    // set pricing here?
    const noLeadingZero = parseInt(this.saladForm.controls.quantity.value, 10);
    this.saladForm.patchValue({
      quantity: noLeadingZero
    });

    const forCart = { ...this.saladForm.value };
    if (this.saladForm.controls.type.value == 'CHICKEN CAESAR SALAD' || this.saladForm.controls.type.value == 'GREEK SALAD') {
      delete forCart.greens;
      delete forCart.cheese;
      delete forCart.freshProduce;
      delete forCart.meats;
      delete forCart.topItOff;
      delete forCart.dressings;
      if (forCart.size == "Entree") {
        forCart.price = 6.95;
      } else {
        forCart.price = 3.95;
      }
    } else {
      delete forCart.size;
      forCart.price = 8.65;
    }
    this.saladItems.push(forCart);
  }

  // this.buildGreens().value,
  // freshProduce: this.buildFreshProduce().value,
  resetForm() {
    this.saladForm.reset();
    this.saladForm.patchValue({
      type: "",
      greens: this.buildGreens().value,
      cheese: this.buildCheese().value,
      freshProduce: this.buildFreshProduce().value,
      meats: this.buildMeats().value,
      topItOff: this.buildTopItOff().value,
      dressings: this.buildDressings().value,
      size: "Side",
      price: 0,
      quantity: 1
    });
  }

  // [this.buildGreens(), oneCheckbox],
  // [this.buildFreshProduce(), oneCheckbox],
  ngOnInit() {
    this.saladForm = this.fb.group({
      type: "",
      greens: this.buildGreens(),
      cheese: this.buildCheese(),
      freshProduce: this.buildFreshProduce(),
      meats: this.buildMeats(),
      topItOff: this.buildTopItOff(),
      dressings: this.buildDressings(),
      size: "Side",
      price: 0,
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(99)]]
    });
  }

  save() {

  }

}
