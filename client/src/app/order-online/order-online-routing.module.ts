import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PastOrderDetailComponent } from './past-orders/past-order-detail/past-order-detail/past-order-detail.component';
import { OrderOnlineComponent } from './order-online.component';
import { CurrentOrderComponent } from './current-order.component';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'order-online', component: OrderOnlineComponent, children: [
        { path: 'current-order', component: CurrentOrderComponent},
        { path: '', redirectTo: 'current-order', pathMatch: 'full'},
        { path: 'past-orders', component: PastOrdersComponent},
        { path: 'past-order-detail/:id', component: PastOrderDetailComponent},
        { path: 'favorites', component: FavoritesComponent}
      ] },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'thank-you', component: ThankYouComponent },
      { path: 'signin-callback', component: SigninRedirectCallbackComponent },
      { path: 'signout-callback', component: SignoutRedirectCallbackComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class OrderOnlineRoutingModule { }
