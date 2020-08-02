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

  // get karma points of user based on its uid
  getKarma(userId: string) {
    return this.firestore.collection('karma', ref => ref.where('userid', '==', userId))
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

  updateKarmaPoints(userId: string, entryPoints: number) {
    console.log('entryPoints', entryPoints);
    console.log('userid', userId);

    // get info about previous karma
    const subscription = this.getKarma(userId)
      .subscribe((karma) => {
        this.karma = {...karma[0]};

        console.log('this.karma', this.karma);

        // If the new entry points are negative, substract to previous karma, else we add
        (entryPoints.toString()).charAt(0) === '-' ?
          this.karma.points -= Number((entryPoints.toString()).substr(1))
            : this.karma.points += entryPoints;

        console.log('this.karma.points', this.karma.points);

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
