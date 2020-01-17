import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './locations/locations.component';
import { MenuModule } from './menu/menu.module';
import { AppRoutingModule } from './app-routing.module';

import { AboutUsComponent } from './about-us/about-us.component';

import { OrderOnlineModule } from './order-online/order-online.module';
import { WebStorageModule } from 'ngx-store';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/interceptor.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


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
    ReactiveFormsModule,
    AppRoutingModule
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
