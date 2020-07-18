import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  questionForm: FormGroup;
  errorMsg: string;

  constructor(private questionService: QuestionService,
              private question: Question,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildQuestionForm();
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

  buildQuestionForm() {
    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      yesPoints: ['', [Validators.required, Validators.pattern('(?:\\b|-)([1-9]{1,2}[0]?|100)\\b')]],
      noPoints: ['', [Validators.required, Validators.pattern('(?:\\b|-)([1-9]{1,2}[0]?|100)\\b')]]
    });


  }

  onAddQuestion() {

    // const title = this.questionForm.value.title;
    // const yesPoints = this.questionForm.value.yesPoints;
    // const noPoints = this.questionForm.value.noPoints;

    this.question = this.questionForm.value;

    this.questionService.addQuestion(this.question);

    // this.questionForm.reset();
    location.reload();
    // console.log(title, yesPoints, noPoints);

  }

}
