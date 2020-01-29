import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Entry } from './entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private firestore: AngularFirestore) { }

  addEntry(entry: Entry) {
    this.firestore.collection('entry').add({ entry });
  }
}
