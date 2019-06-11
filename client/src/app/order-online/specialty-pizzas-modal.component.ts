import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // selector: 'specialty-pizzas-modal',
  templateUrl: './specialty-pizzas-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [`./specialty-pizzas-modal.component.css`]
})
export class SpecialtyPizzasModalComponent {
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
