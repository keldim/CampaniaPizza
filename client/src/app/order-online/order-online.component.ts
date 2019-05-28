import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.css']
})
export class OrderOnlineComponent implements OnInit {

  selectedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserByUsername('john')
      .subscribe(
        (data: User) => this.selectedUser = data,
        (err: any) => console.log(err)
      );
  }

}
