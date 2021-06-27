import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { BuildYourOwnComponent } from './build_your_own/build_your_own.component';
import { SpecialtyPizzaComponent } from './specialty_pizzas/specialty_pizzas.component';
import { DrinkComponent } from './drinks/drinks.component';
import { DessertComponent } from './desserts/desserts.component';
import { SaladComponent } from './salads/salads.component';



@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'menu', component: MenuComponent, children: [
        { path: 'buildyourown', component: BuildYourOwnComponent},
        { path: '', redirectTo: 'buildyourown', pathMatch: 'full'},
        { path: 'specialtypizzas', component: SpecialtyPizzaComponent},
        { path: 'salads', component: SaladComponent},
        { path: 'drinks', component: DrinkComponent},
        { path: 'desserts', component: DessertComponent}
      ] }
    ])
  ],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
