import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all pages modules
import { LandingModule } from './landing/landing.module';
import { ProfileModule } from './profile/profile.module';
import { ListEntriesModule } from './list-entries/list-entries.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LandingModule,
    ProfileModule,
    ListEntriesModule,
    AuthModule
  ],
  exports: []
})

export class PagesModule { }
