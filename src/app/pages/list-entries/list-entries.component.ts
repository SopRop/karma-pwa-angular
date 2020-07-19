import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  isClicked = false;
  clickedEntry: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private entryService: EntryService) { }

  ngOnInit() {
    this.getEntries();
    // If reload with id in url
    // keep showing single entry
    this.route.queryParams.subscribe( (params) => {
      if (params.id) {
        this.isClicked = true; }
    });
  }

  getEntries() {
    // get all entries
    this.entries = this.entryService.getEntries()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Entry;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  onSelectEntry(data) {
    // show oldEntry component
    this.isClicked = true;

    // Navigate to single entry with id
    // keep id in url
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        id: data.id
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  onDelete(id: string) {
    console.log('data', id);
    this.entryService.deleteEntry(id);
  }

}
