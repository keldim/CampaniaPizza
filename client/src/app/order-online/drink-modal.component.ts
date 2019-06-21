import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'drink-modal',
  templateUrl: './drink-modal.component.html',
  styleUrls: [`./drink-modal.component.css`]
})
export class DrinkModalComponent {
  @ViewChild('contentDrink') modal;
  drinkItems: any[] = [];
  drinkForm: FormGroup;
  forEdit: boolean = false;
  indexForEdit: any = 0;

  constructor(private modalService: NgbModal, private fb: FormBuilder) { }

  get type(): FormControl{
    return <FormControl>this.drinkForm.get('type');
  }

  openLg(drinkType) {
    this.drinkForm.patchValue({
      type: drinkType
    });
    this.modalService.open(this.modal, { size: 'lg' });
  }


  buildDisplayForCart() {
    var finalString: string = "";
    // for(let item of this.drinkItems) {
      // finalString += item.type;
        finalString += "\n";
    // }
    return finalString;
  }

  valueBindingForEdit(index) {
    // need to get the index for the item in the pizzaItems??
    // distinguish between create and edit in createTempForm()?
    // create openPizzaForEdit()? if using openPizzaForEdit(), create a diffrent button in pizza modal?
    this.forEdit = true;
    this.indexForEdit = index;
  }

  updateTempForm() {
    this.forEdit = false;
    this.indexForEdit = 0;
  }

  resetEdit() {
    this.forEdit = false;
    this.indexForEdit = 0;
  }

  deleteDrinkItem(index) {
    this.drinkItems.splice(index, 1);
  }



  createTempForm() {
    const forCart = { ...this.drinkForm.value };
    this.drinkItems.push(forCart);
  }

  resetForm() {
    this.drinkForm.reset();
    this.drinkForm.patchValue({
      type: ""
    });
  }

  ngOnInit() {
    this.drinkForm = this.fb.group({
      type: ""
    });
  }

  save() {

  }

}
