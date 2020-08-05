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

    this.firestore.collection('karma').add({...this.karma});
  }

  // get total karma points of user based on its uid
  getKarma(userUid: string) {
    console.log('user get', userUid);
    return this.firestore.collection('karma', ref => ref.where('userid', '==', userUid))
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Karma;
          data.id = a.payload.doc.id;
          console.log('data', data);
          return data;
        });
      }));
  }

  updateKarmaPoints(entryPoints: number, action: string) {
    const user = JSON.parse(localStorage.getItem('user'));

    //  get info about previous karma
    const subscription = this.getKarma(user.uid)
    .subscribe((karma) => {
        this.karma = {...karma[0]};

        // 1. Check if we add or delete an entry
        // 2. Check if the entry is / was negative
        // 3. Do the corresponding operation
        if (action === 'delete') {
          // delete an entry, we reverse the points
          // if negative entry : we add the points back (and vice versa)
          (entryPoints.toString()).charAt(0) === '-' ?
          this.karma.points += Number((entryPoints.toString()).substr(1))
          : this.karma.points -= entryPoints;
        } else {
          // add an entry (positive = add and negative = substract)
          (entryPoints.toString()).charAt(0) === '-' ?
          this.karma.points -= Number((entryPoints.toString()).substr(1))
          : this.karma.points += entryPoints;
        }

        // update collection
        this.firestore.collection('karma')
          .doc(this.karma.id)
          .update({
            points: this.karma.points
          });

        subscription.unsubscribe();
    });
  }

}
