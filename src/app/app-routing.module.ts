import { OldEntryComponent } from './pages/list-entries/old-entry/old-entry.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Admin Components
import { QuestionComponent } from './admin/question/question.component';

// Core components
import { LayoutComponent } from './core/layout/layout.component';
import { NewEntryComponent } from './core/new-entry/new-entry.component';

// Pages components
import { LandingComponent } from './pages/landing/landing.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListEntriesComponent } from './pages/list-entries/list-entries.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: LandingComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      // { path: '', component: LandingComponent },
      { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
      { path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
      { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
      { path: 'questions', component: QuestionComponent, canActivate: [AuthGuard] },
      { path: 'new-entry', component: NewEntryComponent, canActivate: [AuthGuard] },
      { path: 'entries', component: ListEntriesComponent, canActivate: [AuthGuard], children: [
        { path: ':id', component: OldEntryComponent, canActivate: [AuthGuard] },
      ] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
