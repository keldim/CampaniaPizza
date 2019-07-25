import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderOnlineComponent } from './order-online.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'order-online', component: OrderOnlineComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class OrderOnlineRoutingModule { }
