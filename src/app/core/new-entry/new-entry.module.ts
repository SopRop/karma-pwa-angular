import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEntryComponent } from './new-entry.component';

@NgModule({
  declarations: [NewEntryComponent],
  exports: [],
  imports: [
    CommonModule
  ]
})
export class NewEntryModule { }
