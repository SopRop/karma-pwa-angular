import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map, tap } from 'rxjs/operators';


import { Entry } from './entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  entryCollection = this.firestore.collection('entry');

  constructor(private firestore: AngularFirestore) {}

  getEntries() {
    return this.entryCollection.snapshotChanges();
  }

  getEntry(id: string) {
    return this.entryCollection
      .doc(id)
      .ref.get()
      .then( doc => {
        return doc.data();
      });
  }

  addEntry(entry: Entry) {

    // Pour avoir un custom ID
    // this.firestore.collection('entry').doc('ID_CHOUETTE').set(Object.assign({}, entry));
    this.entryCollection.add(Object.assign({}, entry));
  }

  deleteEntry(id: string) {
    this.entryCollection.doc(id).delete();
  }

}
