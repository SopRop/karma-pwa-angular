import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule,
          MatFormFieldModule,
          MatDatepickerModule,
          MatNativeDateModule,
          MatIconModule
        } from '@angular/material';

import { NewEntryComponent } from './new-entry.component';

@NgModule({
  declarations: [NewEntryComponent],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ]
})
export class NewEntryModule { }
