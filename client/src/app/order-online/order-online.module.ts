import { NgModule } from '@angular/core';
import { PizzaModalComponent } from './pizza-modal/pizza-modal.component';
import { SaladModalComponent } from './salad-modal/salad-modal.component';
import { DrinkModalComponent } from './drink-modal/drink-modal.component';
import { DessertModalComponent } from './dessert-modal/dessert-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderOnlineRoutingModule } from './order-online-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { WebStorageModule } from 'ngx-store';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { PastOrderDetailComponent } from './past-orders/past-order-detail/past-order-detail/past-order-detail.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { OrderOnlineComponent } from './order-online.component';
import { CurrentOrderComponent } from './current-order.component';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback.component';
import { ContactInfoAndPaymentComponent } from './contact-info-and-payment/contact-info-and-payment.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';


@NgModule({
  declarations: [
    PizzaModalComponent,
    SaladModalComponent,
    DrinkModalComponent,
    DessertModalComponent,
    OrderOnlineComponent,
    CheckoutComponent,
    ThankYouComponent,
    FavoritesComponent,
    PastOrdersComponent,
    CurrentOrderComponent,
    PastOrderDetailComponent,
    DeleteModalComponent,
    SigninRedirectCallbackComponent,
    SignoutRedirectCallbackComponent,
    ContactInfoAndPaymentComponent,
    UserRegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    OrderOnlineRoutingModule,
    WebStorageModule
  ]
})
export class OrderOnlineModule { }
