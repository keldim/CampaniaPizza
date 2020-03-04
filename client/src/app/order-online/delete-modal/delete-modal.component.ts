import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PizzaModalComponent } from '../pizza-modal/pizza-modal.component';
import { SaladModalComponent } from '../salad-modal/salad-modal.component';
import { DessertModalComponent } from '../dessert-modal/dessert-modal.component';
import { DrinkModalComponent } from '../drink-modal/drink-modal.component';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @ViewChild('deleteConfirmation') modal;
  @ViewChild(PizzaModalComponent) pizzaModalComponent;
  @ViewChild(DessertModalComponent) dessertModalComponent;
  @ViewChild(SaladModalComponent) saladModalComponent;
  @ViewChild(DrinkModalComponent) drinkModalComponent;

  index: any = 0;
  itemType: string = "";

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(index, itemType) {
    this.index = index;
    this.itemType = itemType;
    this.modalService.open(this.modal);
  }

  reset() {
    this.index = 0;
    this.itemType = "";
  }

  delete() {
    if (this.itemType == "pizza") {
      this.pizzaModalComponent.deletePizzaItem(this.index);
    } else if (this.itemType == "salad") {
      this.saladModalComponent.deleteSaladItem(this.index);
    } else if (this.itemType == "drink") {
      this.drinkModalComponent.deleteDrinkItem(this.index);
    } else if (this.itemType == "dessert") {
      this.dessertModalComponent.deleteDessertItem(this.index);
    }
    this.reset();
  }

}
