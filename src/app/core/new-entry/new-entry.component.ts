import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EntryService } from '../../services/entry/entry.service';
import { Entry } from '../../services/entry/entry';

import * as moment from 'moment-timezone';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {

  entry: Entry = new Entry();

  constructor(private router: Router, private entryService: EntryService) { }

  ngOnInit() {
  }

  onSaveEntry() {
    console.log('test :');
    this.router.navigate(['/new-entry']);
  }

  // onAddEntry(entry) {
  //   const allo = firebase.firestore.FieldValue.serverTimestamp(moment.tz());
  //   this.entryService.addEntry({ description: 'test', date: allo });
  // }

}
