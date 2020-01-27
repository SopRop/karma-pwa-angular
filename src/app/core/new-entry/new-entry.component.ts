import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSaveEntry() {
    console.log('test :');
    this.router.navigate(['/new-entry']);
  }

}
