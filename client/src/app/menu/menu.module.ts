import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { BuildYourOwnComponent } from './build_your_own/build_your_own.component';
import { SpecialtyPizzaComponent } from './specialty_pizzas/specialty_pizzas.component';
import { DrinkComponent } from './drinks/drinks.component';
import { DessertComponent } from './desserts/desserts.component';
import { SaladComponent } from './salads/salads.component';
import { MenuRoutingModule } from './menu-routing.module';

@NgModule({
  declarations: [
    MenuComponent,
    BuildYourOwnComponent,
    SpecialtyPizzaComponent,
    DrinkComponent,
    DessertComponent,
    SaladComponent
  ],
  imports: [
    MenuRoutingModule
  ]
})
export class MenuModule { }
