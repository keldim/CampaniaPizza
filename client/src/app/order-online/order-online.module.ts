import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PizzaModalComponent } from './pizza-modal.component';
import { SaladModalComponent } from './salad-modal.component';
import { DrinkModalComponent } from './drink-modal.component';
import { DessertModalComponent } from './dessert-modal.component';
import { OrderOnlineComponent } from './order-online.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PizzaModalComponent,
    SaladModalComponent,
    DrinkModalComponent,
    DessertModalComponent,
    OrderOnlineComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forChild([
      { path: 'order-online', component: OrderOnlineComponent }
    ])
  ],
  exports: [RouterModule]
})
export class OrderOnlineModule { }
