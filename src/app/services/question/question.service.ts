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

  addQuestion() {

  }
}
