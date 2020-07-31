import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Question } from './question';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questions: Observable<Question[]>;

  constructor(private firestore: AngularFirestore) { }

  getQuestions(): Observable<Question[]> {
    return this.firestore.collection('question', ref => ref.orderBy('title', 'asc'))
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Question;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  addQuestion(question: Question) {
    console.log('question :', question);
    // Using spread operator (shallow copy) instead of Object.assign({}, question)
    this.firestore.collection('question').add({...question});
    // this.firestore.collection('question').doc('question_1').set({...question});
    // this.firestore.collection('question').add({...question, test: 100});

  }
}
