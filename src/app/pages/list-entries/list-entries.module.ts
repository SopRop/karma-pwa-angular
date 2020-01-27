import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { ListEntriesComponent } from './list-entries.component';
import { OldEntryModule } from './old-entry/old-entry.module';

@NgModule({
  declarations: [
    ListEntriesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    OldEntryModule
  ]
})
export class ListEntriesModule { }
