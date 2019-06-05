import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SpecialtyPizzaComponent } from './menu/specialty_pizzas.component';
import { LocationComponent } from './locations/locations.component';
import { BuildYourOwnComponent } from './menu/build_your_own.component';
import { MenuComponent } from './menu/menu.component';
import { MenuModule } from './menu/menu.module';
import { AppRoutingModule } from './app-routing.module';
import { OrderOnlineComponent } from './order-online/order-online.component';
import { UserService } from './services/user.service';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocationComponent,
    OrderOnlineComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    MenuModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
