import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { NavModule } from '../nav/nav.module';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavModule
  ]
})
export class LayoutModule { }
