import { Product } from './product.entity';
import { SaladComponent } from '../menu/salads.component';
import { DrinkComponent } from '../menu/drinks.component';
import { DessertComponent } from '../menu/desserts.component';

export class Item {

  type: string;
  detail: string[];

}



// <ul *ngIf="modalComponent.pizzaItems[0] != null" style="list-style-type: none;">
//         <li *ngFor="let item of modalComponent.pizzaItems">


//           <div *ngIf="itemType(item) == 'byo'">
//               <span>Build Your Own Pizza</span>
//               <p style="display: inline; margin-left: 5px;">{{ item.size }} {{ item.crust }} {{ item.sauce }}</p>

//               <div style="display: inline; margin-left: 5px;">
//                   <div style="display: inline; margin-left: 5px;" *ngFor="let subitem of item.cheese">
//                   <p style="display: inline; margin-left: 5px;">{{ subitem }}</p>
//                   </div>
//               </div>
//               <div style="display: inline; margin-left: 5px;">
//                   <div style="display: inline; margin-left: 5px;" *ngFor="let subitem of item.veggies">
//                   <p style="display: inline; margin-left: 5px;">{{ subitem }}</p>
//                   </div>
//               </div>
//               <div style="display: inline; margin-left: 5px;">
//                   <div style="display: inline; margin-left: 5px;" *ngFor="let subitem of item.meats">
//                   <p style="display: inline; margin-left: 5px;">{{ subitem }}</p>
//                   </div>
//               </div>
//               <div style="display: inline; margin-left: 5px;">
//                   <div style="display: inline; margin-left: 5px;" *ngFor="let subitem of item.finishes">
//                   <p style="display: inline; margin-left: 5px;">{{ subitem }}</p>
//                   </div>
//               </div>
//           </div>
//           <div *ngIf="itemType(item) == 'specialty'">
//               <p style="display: inline; margin-left: 5px;">{{ item.size }}</p>
//               <p style="display: inline; margin-left: 5px;">{{ item.crust }}</p>
//               <div style="display: inline; margin-left: 5px;" *ngIf="isArray(item.finishes)">
//                   <div style="display: inline; margin-left: 5px;" *ngFor="let subitem of item.finishes">
//                   <p style="display: inline; margin-left: 5px;">{{ subitem }}</p>
//                   </div>
//               </div>
//           </div>



//         </li>
//         <!-- <p>{{ modalComponent.cartItems[0].size }}</p>
//         <p>{{ modalComponent.cartItems[0].crust }}</p>
//         <p>{{ modalComponent.cartItems[0].sauce }}</p>
//         <p>{{ modalComponent.cartItems[0].cheese }}</p>
//         <p>{{ modalComponent.cartItems[0].veggies }}</p>
//         <p>{{ modalComponent.cartItems[0].meats }}</p>
//         <p>{{ modalComponent.cartItems[0].finishes }}</p> -->
//         </ul>
