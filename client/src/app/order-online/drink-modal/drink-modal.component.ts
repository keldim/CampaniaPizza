import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'drink-modal',
  templateUrl: './drink-modal.component.html',
  styleUrls: [`./drink-modal.component.css`]
})
export class DrinkModalComponent {
  @ViewChild('contentDrink') modal;
  drinkItems: any[] = this.storageService.getDrinkItems();
  drinkForm: FormGroup;
  forEdit: boolean = false;
  indexForEdit: any = 0;


  constructor(private modalService: NgbModal, private fb: FormBuilder, private storageService: StorageService) {
    this.storageService.watchDrinkItems().subscribe(drinkItems => {
      this.drinkItems = drinkItems;
    });
  }

  get type(): FormControl {
    return <FormControl>this.drinkForm.get('type');
  }

  get quantity(): FormControl {
    return <FormControl>this.drinkForm.get('quantity');
  }

  openLg(drinkType) {
    this.drinkForm.patchValue({
      type: drinkType
    });
    this.modalService.open(this.modal, { size: 'lg' });
  }


  buildDisplayForCart() {
    var finalString: string = "";
    return finalString;
  }

  valueBindingForEdit(index) {
    this.forEdit = true;
    this.indexForEdit = index;
    this.drinkForm.patchValue({
      quantity: this.drinkItems[index].quantity
    });
  }

  updateTempForm() {
    const noLeadingZero = parseInt(this.drinkForm.controls.quantity.value, 10);

    let newArrayWithUpdate = this.storageService.getDrinkItems();
    newArrayWithUpdate[this.indexForEdit].quantity = noLeadingZero;
    this.storageService.updateDrinkItems("drinkItems", newArrayWithUpdate);

    this.forEdit = false;
    this.indexForEdit = 0;
  }

  resetEdit() {
    this.forEdit = false;
    this.indexForEdit = 0;
  }

  deleteDrinkItem(index) {
    let newArrayWithDeletedItem = this.storageService.getDrinkItems();
    newArrayWithDeletedItem.splice(index, 1);
    this.storageService.updateDrinkItems("drinkItems", newArrayWithDeletedItem);
  }



  createTempForm() {
    const noLeadingZero = parseInt(this.drinkForm.controls.quantity.value, 10);
    this.drinkForm.patchValue({
      quantity: noLeadingZero
    });
    const forCart = { ...this.drinkForm.value };

    let newArrayWithAddedItem = this.storageService.getDrinkItems();
    newArrayWithAddedItem.push(forCart);
    this.storageService.updateDrinkItems("drinkItems", newArrayWithAddedItem);
  }

  resetForm() {
    this.drinkForm.reset();
    this.drinkForm.patchValue({
      type: "",
      price: 1.85,
      quantity: 1
    });
  }

  ngOnInit() {
    this.drinkForm = this.fb.group({
      type: "",
      price: 1.85,
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(99)]]
    });

  }

  pastOrderDetailForm(drinkItem) {
    this.drinkForm.reset();
    this.drinkForm.patchValue({
      type: drinkItem.type,
      price: drinkItem.price,
      quantity: drinkItem.quantity
    });
  }

  save() {

  }
}
