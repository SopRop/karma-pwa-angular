import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing.component';
import { NewEntryModule } from 'src/app/core/new-entry/new-entry.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    NewEntryModule,
    RouterModule
  ]
})
export class LandingModule { }
