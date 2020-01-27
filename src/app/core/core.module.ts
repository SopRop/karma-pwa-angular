import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from './layout/layout.module';
import { NewEntryModule } from './new-entry/new-entry.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    NewEntryModule
  ]
})
export class CoreModule { }
