import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { QuestionService } from './../../services/question/question.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/services/question/question';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  questions: Question[] = [];

  questionForm: FormGroup;
  errorMsg: string;

  // Mandatory directive to reset all the form (even validators)
  @ViewChild('formDirective', {static: false}) private formDirective: NgForm;

  constructor(private questionService: QuestionService,
              private question: Question,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildQuestionForm();
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestions()
      .subscribe((question: Question[]) => {
        this.questions = question;
        }
      );
  }

  buildQuestionForm() {
    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      yesPoints: ['', [Validators.required, Validators.pattern('^([0-9]|[1-9][0-9]|100)$')]],
      noPoints: ['', [Validators.required, Validators.pattern('^([0-9]|[1-9][0-9]|100)$')]],
      yesSign: ['', Validators.required],
      noSign: ['', Validators.required]
    });
  }

  onAddQuestion() {
    this.question = this.questionForm.value;

    this.questionService.addQuestion(this.question);

    // Mandatory directive to reset all the form (even validators)
    this.formDirective.resetForm();
  }

}
