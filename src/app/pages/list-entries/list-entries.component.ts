import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EntryService } from '../../services/entry/entry.service';
import { Entry } from '../../services/entry/entry';

// import * as moment from 'moment-timezone';
// import 'moment-timezone';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-entries',
  templateUrl: './list-entries.component.html',
  styleUrls: ['./list-entries.component.scss']
})
export class ListEntriesComponent implements OnInit {

  entries: Observable<Entry[]>;

  constructor(private router: Router,
              private entryService: EntryService,
              private entry: Entry) { }

  ngOnInit() {
    this.getEntries();
  }

  getEntries() {
    this.entries = this.entryService.getEntries()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Entry;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

}
