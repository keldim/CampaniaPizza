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
    for(let item of this.drinkItems) {
      finalString += item.type;
        finalString += "\n";
    }
    return finalString;
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
