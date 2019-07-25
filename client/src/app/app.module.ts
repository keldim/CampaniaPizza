import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './locations/locations.component';
import { MenuModule } from './menu/menu.module';
import { AppRoutingModule } from './app-routing.module';
import { OrderOnlineComponent } from './order-online/order-online.component';
import { UserService } from './services/user.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PizzaModalComponent } from './order-online/pizza-modal.component';
import { DessertModalComponent } from './order-online/dessert-modal.component';
import { SaladModalComponent } from './order-online/salad-modal.component';
import { DrinkModalComponent } from './order-online/drink-modal.component';
import { OrderOnlineModule } from './order-online/order-online.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocationComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MenuModule,
    OrderOnlineModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {

  // declarations
  // OrderOnlineComponent,
  // PizzaModalComponent,
  // DessertModalComponent,
  // SaladModalComponent,
  // DrinkModalComponent


  // imports
  // OrderOnlineModule
  // ReactiveFormsModule,
  // HttpClientModule,
  // NgbModule.forRoot(),
}
