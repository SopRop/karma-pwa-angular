import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EntryService } from '../../services/entry/entry.service';
import { Entry } from '../../services/entry/entry';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment-timezone';
import 'moment-timezone';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss'],
  providers: [Entry]
})
export class NewEntryComponent implements OnInit {

  entries: Observable<Entry[]>;
  entryForm: FormGroup;
  current_date: string;

  constructor(private router: Router,
              private entryService: EntryService,
              private entry: Entry,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildEntryForm();
    this.current_date = moment().tz('Europe/Paris').format();
  }

  buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      date: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onAddEntry() {
    console.log('entryForm', this.entryForm.value);

    this.entry = this.entryForm.value;

    this.entryService.addEntry(this.entry);
    this.router.navigate(['/entries']);
  }
}
