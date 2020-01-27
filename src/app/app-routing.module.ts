import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './core/layout/layout.component';

import { LandingComponent } from './pages/landing/landing.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListEntriesComponent } from './pages/list-entries/list-entries.component';

import { NewEntryComponent } from './core/new-entry/new-entry.component';




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
        path: 'entries',
        component: ListEntriesComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'new-entry/new',
        component: NewEntryComponent,
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
