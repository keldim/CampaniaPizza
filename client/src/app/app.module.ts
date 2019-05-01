import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { SpecialtyPizzaComponent } from './specialty_pizzas.component';
import { LocationComponent } from './locations.component';
import { BuildYourOwnComponent } from './build_your_own.component';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SpecialtyPizzaComponent,
    HomeComponent,
    LocationComponent,
    SpecialtyPizzaComponent,
    BuildYourOwnComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'menu/buildyourown', component: BuildYourOwnComponent, outlet: 'submenu'},
      { path: 'menu/specialtypizzas', component: SpecialtyPizzaComponent, outlet: 'submenu'},
      { path: 'locations', component: LocationComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
