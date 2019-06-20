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
      brownieChoice: "Chocolate"
    });
  }

  ngOnInit() {
    this.dessertForm = this.fb.group({
      type: "",
      cookieChoice: "Chocolate Chip",
      brownieChoice: "Chocolate"
    });
  }

  save() {

  }

}
