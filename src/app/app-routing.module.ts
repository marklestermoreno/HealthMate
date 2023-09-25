import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  routes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
      children: [
        // { path: 'features', component: FeaturesComponent },
        // { path: 'screens', component: ScreensComponent },
        // { path: 'pricing', component: PricingComponent },
        // { path: 'contacts', component: ContactsComponent },
        // { path: 'team', component: TeamComponent },
        { path: '', redirectTo: 'features', pathMatch: 'full' } // Default child route
      ],
    },
  ];
}
