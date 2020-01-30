import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firestore: AngularFirestore) { }

  getUsersList() {
    return this.firestore.collection('user').snapshotChanges();
  }

  addUser(username: string) {
    this.firestore.collection('user').add({ username });
  }
}
