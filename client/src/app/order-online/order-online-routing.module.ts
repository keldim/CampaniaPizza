import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderOnlineComponent } from './order-online.component';
import { CheckoutComponent } from './checkout/checkout.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'order-online', component: OrderOnlineComponent },
      { path: 'checkout', component: CheckoutComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class OrderOnlineRoutingModule { }
