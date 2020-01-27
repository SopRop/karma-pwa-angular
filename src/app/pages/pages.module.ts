import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all modules
import { LandingModule } from './landing/landing.module';
import { ProfileModule } from './profile/profile.module';
import { ListEntriesModule } from './list-entries/list-entries.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LandingModule,
    ProfileModule,
    ListEntriesModule
  ],
  exports: []
})

export class PagesModule { }
