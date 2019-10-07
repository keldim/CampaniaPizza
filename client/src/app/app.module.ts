import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './locations/locations.component';
import { MenuModule } from './menu/menu.module';
import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth.service';
import { AboutUsComponent } from './about-us/about-us.component';

import { OrderOnlineModule } from './order-online/order-online.module';
import { WebStorageModule } from 'ngx-store';
import { SecurityComponent } from './security/security.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocationComponent,
    AboutUsComponent
    // ,
    // SecurityComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MenuModule,
    OrderOnlineModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  // providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
