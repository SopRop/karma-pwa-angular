import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './pages/landing/landing.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { LayoutComponent } from './core/layout/layout.component';
import { NavComponent } from './core/nav/nav.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
      path: '',
      component: LandingComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
