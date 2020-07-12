import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionService } from './../../services/question/question.service';
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/services/question/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questions: Observable<Question[]>;

  constructor(private questionService: QuestionService,
              private question: Question) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.questions = this.questionService.getQuestions()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Question;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

}
