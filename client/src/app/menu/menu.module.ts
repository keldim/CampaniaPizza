import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { MenuComponent } from './menu.component';
import { BuildYourOwnComponent } from './build_your_own.component';
import { SpecialtyPizzaComponent } from './specialty_pizzas.component';


@NgModule({
  declarations: [
    MenuComponent,
    BuildYourOwnComponent,
    SpecialtyPizzaComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'menu', component: MenuComponent, children: [
        { path: 'buildyourown', component: BuildYourOwnComponent},
        { path: '', redirectTo: 'buildyourown', pathMatch: 'full'},
        { path: 'specialtypizzas', component: SpecialtyPizzaComponent}
      ] }
    ])
  ],
  exports: [RouterModule]
})
export class MenuModule { }
