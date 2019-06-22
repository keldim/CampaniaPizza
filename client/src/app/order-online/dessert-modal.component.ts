import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dessert-modal',
  templateUrl: './dessert-modal.component.html',
  styleUrls: [`./dessert-modal.component.css`]
})
export class DessertModalComponent {
  @ViewChild('contentDessert') modal;
  dessertItems: any[] = [];
  dessertForm: FormGroup;
  forEdit: boolean = false;
  indexForEdit: any = 0;


  constructor(private modalService: NgbModal, private fb: FormBuilder) { }

  get type(): FormControl{
    return <FormControl>this.dessertForm.get('type');
  }

  openLg(dessertType) {
    this.dessertForm.patchValue({
      type: dessertType
    });
    this.modalService.open(this.modal, { size: 'lg' });
  }


  buildDisplayForCart() {
    var finalString: string = "";
    // for(let item of this.dessertItems) {
    //   if(item.hasOwnProperty("cookieChoice")) {
    //     finalString += "DESSERT\n"
    //     finalString += (item.cookieChoice + "\n");
    //   } else {
    //     finalString += "DESSERT\n"
    //     finalString += (item.brownieChoice + "\n");
    //   }
    // }
    finalString += "\n"
    return finalString;
  }


  valueBindingForEdit(index) {
    // need to get the index for the item in the pizzaItems??
    // distinguish between create and edit in createTempForm()?
    // create openPizzaForEdit()? if using openPizzaForEdit(), create a diffrent button in pizza modal?
    this.forEdit = true;
    this.indexForEdit = index;
    if (this.dessertItems[index].type == "Cookies") {
      this.dessertForm.patchValue({
        type: this.dessertItems[index].type,
        cookieChoice: this.dessertItems[index].cookieChoice
      });
    } else {
      this.dessertForm.patchValue({
        type: this.dessertItems[index].type,
        brownieChoice: this.dessertItems[index].brownieChoice
      });
    }
  }

  updateTempForm() {
    if (this.dessertForm.controls.type.value == 'Cookies') {
      this.dessertItems[this.indexForEdit].type = this.dessertForm.controls.type.value;
      this.dessertItems[this.indexForEdit].cookieChoice = this.dessertForm.controls.cookieChoice.value;
    } else {
      this.dessertItems[this.indexForEdit].type = this.dessertForm.controls.type.value;
      this.dessertItems[this.indexForEdit].brownieChoice = this.dessertForm.controls.brownieChoice.value;
    }
    this.forEdit = false;
    this.indexForEdit = 0;
  }

  resetEdit() {
    this.forEdit = false;
    this.indexForEdit = 0;
  }

  deleteDessertItem(index) {
    this.dessertItems.splice(index, 1);
  }


  createTempForm() {
    const forCart = { ...this.dessertForm.value };
    if(this.dessertForm.controls.type.value == "Cookies") {
      delete forCart.brownieChoice;
    } else if (this.dessertForm.controls.type.value == "Brownies") {
      delete forCart.cookieChoice;
    }
    this.dessertItems.push(forCart);
  }

  resetForm() {
    this.dessertForm.reset();
    this.dessertForm.patchValue({
      type: "",
      cookieChoice: "Chocolate Chip",
      brownieChoice: "Chocolate",
      price: 1.99
    });
  }

  ngOnInit() {
    this.dessertForm = this.fb.group({
      type: "",
      cookieChoice: "Chocolate Chip",
      brownieChoice: "Chocolate",
      price: 1.99
    });
  }

  save() {

  }

}
