import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EntryService } from '../../services/entry/entry.service';
import { Entry } from '../../services/entry/entry';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment-timezone';
import 'moment-timezone';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss'],
  providers: [Entry]
})
export class NewEntryComponent implements OnInit {

  entries: Observable<Entry[]>;
  entryForm: FormGroup;

  constructor(private router: Router,
              private entryService: EntryService,
              private entry: Entry,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
/*     this.getEntries();
    console.log('this.entries :', this.entries); */

    this.buildEntryForm();
  }

  buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

/*   getEntries() {
    this.entries = this.entryService.getEntries()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Entry;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  } */

  onSubmit() {
    console.log('entryForm', this.entryForm.value);

    this.entry = this.entryForm.value;

    this.entry.date = moment().tz('Europe/Paris').format();

    this.entryService.addEntry(this.entry);
    this.router.navigate(['/entries']);
  }
}
