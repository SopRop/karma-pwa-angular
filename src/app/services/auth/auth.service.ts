import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Router } from '@angular/router';

import { User } from './user';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Save logged-in data user
  userData: any;

  constructor(public firestore: AngularFirestore,
              public authFire: AngularFireAuth,
              public router: Router,
              public ngZone: NgZone ) {

    // Save user data in localstorage when log in OR set it up to null when log out
    this.authFire.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // getUsersList() {
  //   return this.firestore.collection('user').snapshotChanges();
  // }

  // addUser(username: string) {
  //   this.firestore.collection('user').add({ username });
  // }

  // sign in with email and pwd
  async signIn(email, password) {
    return this.authFire.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        this.setUserData(result.user);
      });
      // .catch((error) => {
      //   window.alert(error.message);
      // });
  }

  // sign up with email and pwd
  async signUp(email, password) {
    return this.authFire.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        this.setUserData(result.user);
      });
      // .catch((error) => {
      //   window.alert(error.message);
      // });
  }

  // reset pwd
  async forgotPassword(passwordResetEmail) {
    return this.authFire.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent');
      });
      // .catch((error) => {
      //   window.alert(error);
      // });
  }

  // is user logged in?
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // sign in with google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // sign in with facebook
  facebookAuth() {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  // auth logic to run auth providers
  async authLogin(provider) {
    return this.authFire.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`user/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // photoUrl: user.photoUrl
    }
    return userRef.set(userData, {
      merge: true
    });
  }

  async signOut() {
    return this.authFire.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
