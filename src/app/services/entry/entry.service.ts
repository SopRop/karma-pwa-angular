import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Entry } from './entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private firestore: AngularFirestore) { }

  getEntries() {
    return this.firestore.collection('entry').snapshotChanges();
  }

  addEntry(entry: Entry) {
    console.log('entry :', entry);
    // Pour avoir un custom ID
    // this.firestore.collection('entry').doc('ID_CHOUETTE').set(Object.assign({}, entry));
    this.firestore.collection('entry').add(Object.assign({}, entry));
  }

}
