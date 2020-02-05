import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule, MatButtonModule } from '@angular/material';

import { NavComponent } from './nav.component';

@NgModule({
  declarations: [NavComponent],
  exports: [NavComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class NavModule { }
