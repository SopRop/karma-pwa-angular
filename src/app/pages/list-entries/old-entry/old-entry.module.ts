import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OldEntryComponent } from './old-entry.component';

@NgModule({
  declarations: [
    OldEntryComponent
  ],
  exports: [
    OldEntryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OldEntryModule { }
