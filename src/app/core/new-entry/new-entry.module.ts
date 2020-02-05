import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewEntryComponent } from './new-entry.component';

@NgModule({
  declarations: [NewEntryComponent],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NewEntryModule { }
