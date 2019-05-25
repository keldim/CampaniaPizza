import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LocationComponent } from './locations/locations.component';
import { OrderOnlineComponent } from './order-online/order-online.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'locations', component: LocationComponent },
      { path: 'order-online', component: OrderOnlineComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
