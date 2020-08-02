import { EntryService } from './../../../services/entry/entry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-old-entry',
  templateUrl: './old-entry.component.html',
  styleUrls: ['./old-entry.component.scss']
})
export class OldEntryComponent implements OnInit {

  oldEntry: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private entryService: EntryService) { }

  ngOnInit() {
      this.getEntryId();
  }

  async getEntryId() {
    await new Promise(resolve => {
      this.route.queryParams
      .pipe(map(data => data))
        .subscribe(result => {
          resolve(result);
          this.getEntry(result);
      });
    });
  }

  getEntry(params) {
    this.entryService.getEntry(params.id)
    .then(data => {
      Object.assign(data, params);
      this.oldEntry = data;
      return this.oldEntry;
    });
  }

  onDelete() {
    this.entryService.deleteEntry(this.oldEntry.id);
    this.onBack();
  }

  onBack() {
    // allow refresh of entries url to reload all entries
    this.router.navigate(['/'], { skipLocationChange: false }).then(() => {
      this.router.navigate(['/entries']);
  });
  }
}
