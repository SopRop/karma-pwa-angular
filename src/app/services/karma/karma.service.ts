import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Karma } from './karma';

@Injectable({
  providedIn: 'root',
})
export class KarmaService {

  karma: Karma;

  constructor(private firestore: AngularFirestore) { }

  addNewUserKarma(user: any) {
    this.karma = new Karma();
    this.karma.userid = user.uid;
    this.karma.points = 1000;

    console.log('new user karma', this.karma);

    this.firestore.collection('karma').add({...this.karma});
  }

  getKarma(userid: string) {
    console.log('back', userid);
    return this.firestore.collection('karma', ref => ref.where('userid', '==', userid))
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Karma;
          data.userid = a.payload.doc.id;
          return data;
        });
      }));
  }
}
