import { NgModule } from '@angular/core';
import { PizzaModalComponent } from './pizza-modal/pizza-modal.component';
import { SaladModalComponent } from './salad-modal/salad-modal.component';
import { DrinkModalComponent } from './drink-modal/drink-modal.component';
import { DessertModalComponent } from './dessert-modal/dessert-modal.component';
import { OrderOnlineComponent } from './order-online.component';
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
import { CurrentOrderComponent } from './current-order.component';
import { PastOrderDetailComponent } from './past-orders/past-order-detail/past-order-detail/past-order-detail.component';


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
    PastOrderDetailComponent
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
