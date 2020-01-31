import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
      { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
      { path: 'entries', component: ListEntriesComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'new-entry/new', component: NewEntryComponent, canActivate: [AuthGuard] },
      { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

// { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
// { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
// { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
// { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
// { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
// { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
