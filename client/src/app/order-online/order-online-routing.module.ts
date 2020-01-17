import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderOnlineComponent } from './order-online.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { CurrentOrderComponent } from './current-order.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PastOrderDetailComponent } from './past-orders/past-order-detail/past-order-detail/past-order-detail.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'order-online', component: CurrentOrderComponent, children: [
        { path: 'current-order', component: OrderOnlineComponent},
        { path: '', redirectTo: 'current-order', pathMatch: 'full'},
        { path: 'past-orders', component: PastOrdersComponent},
        { path: 'past-order-detail/:id', component: PastOrderDetailComponent},
        { path: 'favorites', component: FavoritesComponent}
      ] },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'thank-you', component: ThankYouComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class OrderOnlineRoutingModule { }
