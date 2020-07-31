import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { Entry } from './entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  entries: Observable<Entry[]>;
  entryCollection = this.firestore.collection('entry');

  constructor(private firestore: AngularFirestore) {}

  getEntries(): Observable<Entry[]> {
    return this.firestore.collection('entry', ref => ref.orderBy('date', 'desc'))
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Entry;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
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
    console.log('entry back', entry);
    this.entryCollection.add({...entry});
  }

  deleteEntry(id: string) {
    this.entryCollection.doc(id).delete();
  }

}
