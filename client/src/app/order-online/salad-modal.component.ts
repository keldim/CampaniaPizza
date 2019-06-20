import { ViewChild, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'salad-modal',
  templateUrl: './salad-modal.component.html',
  styleUrls: [`./salad-modal.component.css`]
})
export class SaladModalComponent {
  @ViewChild('contentSalad') modal;
  saladItems: any[] = [];
  saladForm: FormGroup;
  saladCheckboxes = {
    greens: [
      { name: 'Romaine Hearts', selected: false },
      { name: 'Spinach', selected: false }
    ],
    cheese: [
      { name: 'Gorgonzola', selected: false },
      { name: 'Mozzarella', selected: false },
      { name: 'Ricotta', selected: false },
      { name: 'Grated Parmesan', selected: false },
      { name: 'Feta', selected: false }
    ],
    freshProduce: [
      { name: 'Artichokes', selected: false },
      { name: 'Black Olives', selected: false },
      { name: 'Grape Tomatoes', selected: false },
      { name: 'Green Peppers', selected: false },
      { name: 'Cucumbers', selected: false },
      { name: 'Jalapenos', selected: false },
      { name: 'Mushrooms', selected: false },
      { name: 'Pineapple', selected: false },
      { name: 'Red Onion', selected: false },
      { name: 'Roasted Red Pepper', selected: false },
      { name: 'Garlic', selected: false },
      { name: 'Broccoli', selected: false },
      { name: 'Sliced Tomatoes', selected: false }
    ],
    meats: [
      { name: 'Bacon', selected: false },
      { name: 'Canadian Bacon', selected: false },
      { name: 'All-Natural Chicken', selected: false },
      { name: 'All-Natural Spicy Chicken', selected: false },
      { name: 'Meatball', selected: false },
      { name: 'Pepperoni', selected: false },
      { name: 'Sausage', selected: false },
      { name: 'Spicy Sausage', selected: false }
    ],
    topItOff: [
      { name: 'Black Pepper', selected: false },
      { name: 'Croutons', selected: false },
      { name: 'Dried Cranberries', selected: false },
      { name: 'Oregano', selected: false },
      { name: 'Red Pepper Flakes', selected: false },
      { name: 'Sea Salt', selected: false }
    ],
    dressings: [
      { name: 'Caesar Dressing', selected: false },
      { name: 'Creamy Italian Dressing', selected: false },
      { name: 'Olive Oil & Vinegar Dressing', selected: false },
      { name: 'Ranch Dressing', selected: false },
      { name: 'Greek Dressing', selected: false }
    ]
  };

  constructor(private modalService: NgbModal, private fb: FormBuilder) { }






  openLg(saladType) {
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
    return this.fb.array(arr);
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
    return this.fb.array(arr);
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
      finalString += "\n";
    } else {
      // finalString += item.type;
      finalString += "\n";
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




  createTempForm() {
    const forCart = { ...this.saladForm.value };
    if (this.saladForm.controls.type.value == 'CHICKEN CAESAR SALAD' || this.saladForm.controls.type.value == 'GREEK SALAD') {
      delete forCart.greens;
      delete forCart.cheese;
      delete forCart.freshProduce;
      delete forCart.meats;
      delete forCart.topItOff;
      delete forCart.dressings;
    }
    this.saladItems.push(forCart);
  }

  resetForm() {
    this.saladForm.reset();
    this.saladForm.patchValue({
      type: "",
      greens: this.buildGreens().value,
      cheese: this.buildCheese().value,
      freshProduce: this.buildFreshProduce().value,
      meats: this.buildMeats().value,
      topItOff: this.buildTopItOff().value,
      dressings: this.buildDressings().value
    });
  }

  ngOnInit() {
    this.saladForm = this.fb.group({
      type: "",
      greens: this.buildGreens(),
      cheese: this.buildCheese(),
      freshProduce: this.buildFreshProduce(),
      meats: this.buildMeats(),
      topItOff: this.buildTopItOff(),
      dressings: this.buildDressings()
    });
  }

  save() {

  }

}
