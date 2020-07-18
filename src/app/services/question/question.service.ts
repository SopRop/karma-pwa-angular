import { Question } from './question';
import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private firestore: AngularFirestore) { }

  getQuestions() {
    return this.firestore.collection('question').snapshotChanges();
  }

  addQuestion(question: Question) {
    console.log('question :', question);
    // Pour avoir un custom ID
    // this.firestore.collection('entry').doc('ID_CHOUETTE').set(Object.assign({}, entry));
    this.firestore.collection('question').add(Object.assign({}, question));
  }
}
