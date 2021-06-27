import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './locations/locations.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'locations', component: LocationComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'error-page', component: ErrorPageComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ], {scrollPositionRestoration: 'enabled'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
