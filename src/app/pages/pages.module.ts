import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all modules
import { LandingModule } from './landing/landing.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LandingModule,
    ProfileModule
  ],
  exports: []
})

export class PagesModule { }
