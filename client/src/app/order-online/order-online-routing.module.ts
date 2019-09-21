import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderOnlineComponent } from './order-online.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'order-online', component: OrderOnlineComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'thank-you', component: ThankYouComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class OrderOnlineRoutingModule { }
