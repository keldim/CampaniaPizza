import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { SpecialtyPizzaComponent } from './specialty_pizzas.component';
import { LocationComponent } from './locations.component';
import { BuildYourOwnComponent } from './build_your_own.component';

@NgModule({
  declarations: [
    AppComponent,
    SpecialtyPizzaComponent,
    NavbarComponent,
    LocationComponent,
    SpecialtyPizzaComponent,
    BuildYourOwnComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
