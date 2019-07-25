import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './locations/locations.component';
import { MenuModule } from './menu/menu.module';
import { AppRoutingModule } from './app-routing.module';

import { UserService } from './services/user.service';
import { AboutUsComponent } from './about-us/about-us.component';

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
export class AppModule { }
