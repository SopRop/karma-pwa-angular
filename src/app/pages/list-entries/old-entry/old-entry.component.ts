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

  isReady = false;
  oldEntry: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private entryService: EntryService) { }

  ngOnInit() {
      this.isReady = false;
      this.getEntryId();
  }

  async getEntryId() {
    await new Promise( resolve => {
      this.route.queryParams
      .pipe(map(data => data))
        .subscribe(result => {
          console.log('result', result);
          resolve(result);
          this.getEntry(result);
      });
    });
  }

  getEntry(params) {
    console.log('test', params);
    this.entryService.getEntry(params.id)
    .then(data => {
      console.log('data', data);
      Object.assign(data, params);
      this.oldEntry = data;
      this.isReady = true;
      return this.oldEntry;
    });
  }

  onDelete() {
    console.log('pouah');
    // console.log('data', this.oldEntry.id);
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
