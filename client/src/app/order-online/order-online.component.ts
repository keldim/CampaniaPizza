import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialtyPizza } from './specialty-pizza';
import { BYOPizza } from './byo-pizza';

@Component({
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.css']
})
export class OrderOnlineComponent implements OnInit {
  closeResult: string;
  selectedUser: User;

  specialtyPizzaOrder: SpecialtyPizza = {
    size: '10',
    crust: 'traditional',
    ingredients: []
  };
  byoPizzaOrder: BYOPizza;



  constructor(private userService: UserService, private modalService: NgbModal) { }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  ngOnInit() {
    // this.userService.getUserByUsername('john')
    //   .subscribe(
    //     (data: User) => this.selectedUser = data,
    //     (err: any) => console.log(err)
    //   );
  }

  // hide menu based on ngIf?

  // create a different form for each menu type? use formbuilder?


}
