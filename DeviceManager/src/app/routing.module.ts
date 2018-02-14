import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { patch } from 'webdriver-js-extender';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'devices', pathMatch: 'full' },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'notFound', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'notFound' }
];

@NgModule({

  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})

export class AppRoutingModule {

}
