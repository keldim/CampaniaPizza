import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public shoppingCartItems$: Observable<any[]>;

  constructor() {}

}
