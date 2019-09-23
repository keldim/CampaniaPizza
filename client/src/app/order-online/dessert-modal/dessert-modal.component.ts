import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from 'ngx-store';

@Component({
  selector: 'dessert-modal',
  templateUrl: './dessert-modal.component.html',
  styleUrls: [`./dessert-modal.component.css`]
})
export class DessertModalComponent {
  @ViewChild('contentDessert') modal;
  @LocalStorage() dessertItems: any[] = [];
  dessertForm: FormGroup;
  forEdit: boolean = false;
  indexForEdit: any = 0;


  constructor(private modalService: NgbModal, private fb: FormBuilder) {

   }

  get type(): FormControl {
    return <FormControl>this.dessertForm.get('type');
  }

  get quantity(): FormControl {
    return <FormControl>this.dessertForm.get('quantity');
  }

  openLg(dessertType) {
    this.dessertForm.patchValue({
      type: dessertType
    });
    this.modalService.open(this.modal, { size: 'lg' });
  }


  buildDisplayForCart() {
    var finalString: string = "";
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
        cookieChoice: this.dessertItems[index].cookieChoice,
        quantity: this.dessertItems[index].quantity
      });
    } else {
      this.dessertForm.patchValue({
        type: this.dessertItems[index].type,
        brownieChoice: this.dessertItems[index].brownieChoice,
        quantity: this.dessertItems[index].quantity
      });
    }
  }

  updateTempForm() {
    if (this.dessertForm.controls.type.value == 'Cookies') {
      this.dessertItems[this.indexForEdit].type = this.dessertForm.controls.type.value;
      this.dessertItems[this.indexForEdit].cookieChoice = this.dessertForm.controls.cookieChoice.value;

      const noLeadingZero = parseInt(this.dessertForm.controls.quantity.value, 10);
      this.dessertItems[this.indexForEdit].quantity = noLeadingZero;
    } else {
      this.dessertItems[this.indexForEdit].type = this.dessertForm.controls.type.value;
      this.dessertItems[this.indexForEdit].brownieChoice = this.dessertForm.controls.brownieChoice.value;

      const noLeadingZero = parseInt(this.dessertForm.controls.quantity.value, 10);
      this.dessertItems[this.indexForEdit].quantity = noLeadingZero;
    }
    this.forEdit = false;
    this.indexForEdit = 0;
    this.dessertItems = this.dessertItems;
  }

  resetEdit() {
    this.forEdit = false;
    this.indexForEdit = 0;
  }

  deleteDessertItem(index) {
    this.dessertItems.splice(index, 1);
  }

  cookieRadioClicking(selectedValue) {
    this.dessertForm.patchValue({
      cookieChoice: selectedValue
    });
  }

  brownieRadioClicking(selectedValue) {
    this.dessertForm.patchValue({
      brownieChoice: selectedValue
    });
  }

  createTempForm() {
    const noLeadingZero = parseInt(this.dessertForm.controls.quantity.value, 10);
    this.dessertForm.patchValue({
      quantity: noLeadingZero
    });
    const forCart = { ...this.dessertForm.value };
    if (this.dessertForm.controls.type.value == "Cookies") {
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
      cookieChoice: "Chocolate Chip Cookie",
      brownieChoice: "Chocolate Brownie",
      price: 1.99,
      quantity: 1
    });
  }

  ngOnInit() {
    this.dessertForm = this.fb.group({
      type: "",
      cookieChoice: "Chocolate Chip Cookie",
      brownieChoice: "Chocolate Brownie",
      price: 1.99,
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(99)]]
    });
  }

  save() {

  }

}
