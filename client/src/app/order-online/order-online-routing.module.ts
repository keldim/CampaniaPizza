import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { PastOrderDetailComponent } from './past-orders/past-order-detail/past-order-detail/past-order-detail.component';
import { OrderOnlineComponent } from './order-online.component';
import { CurrentOrderComponent } from './current-order.component';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ContactInfoAndPaymentComponent } from './contact-info-and-payment/contact-info-and-payment.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'order-online', component: OrderOnlineComponent, children: [
        { path: 'current-order', component: CurrentOrderComponent},
        { path: '', redirectTo: 'current-order', pathMatch: 'full'},
        { path: 'past-orders', component: PastOrdersComponent},
        { path: 'past-order-detail/:id', component: PastOrderDetailComponent},
        { path: 'thank-you', component: ThankYouComponent }
      ] },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'signin-callback', component: SigninRedirectCallbackComponent },
      { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
      { path: 'new-user', component: UserRegistrationComponent },
      { path: 'contact-info-and-payment', component: ContactInfoAndPaymentComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class OrderOnlineRoutingModule { }
