import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionService } from './../../services/question/question.service';
import { Question } from 'src/app/services/question/question';

import { EntryService } from '../../services/entry/entry.service';
import { Entry } from '../../services/entry/entry';

import { KarmaService } from './../../services/karma/karma.service';

import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import * as moment from 'moment-timezone';
import 'moment-timezone';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss'],
  providers: [Entry]
})
export class NewEntryComponent implements OnInit {

  entries: Observable<Entry[]>;
  entryQuestions: Question[] = [];
  entryForm: FormGroup;
  currentDate: string;

  constructor(private router: Router,
              private entryService: EntryService,
              private questionService: QuestionService,
              private entry: Entry,
              private formBuilder: FormBuilder,
              private karmaService: KarmaService) { }

  ngOnInit() {
    this.buildEntryForm();
    this.getEntryQuestions();
    this.currentDate = moment().tz('Europe/Paris').format();
    this.entryForm.get('date').setValue(this.currentDate);
  }

  getEntryQuestions() {
    this.questionService.getQuestions()
    .subscribe((question: Question[]) => {
      // shuffle all questions and retrieve x on random
      this.entryQuestions = question.sort(() => 0.5 - Math.random()).slice(0, 2);
      // Add questions dynamically in form
      this.entryQuestions.forEach(() => {
        (this.entryForm.controls.answers as FormArray).push(new FormControl());
      });
    });
  }

  buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      date: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
  }

  onAddEntry() {
    // deep copy of form
    const entry = {...this.entryForm.value};
    // add questions to form values
    entry.questions = [...this.entryQuestions];

    // associate boolean user answer to specific question
    entry.questions.map((el, i) => {
      entry.answers[i] === null || false ? entry.answers[i] = false : entry.answers[i] = true;
      el.answer = entry.answers[i];
    });

    // delete array of answers (each answer previously saved in each question)
    delete entry.answers;
    // initialize sum of points for questions
    let sum = 0;

    // for each question : check answer (positive or negative)
    entry.questions.forEach(el => {
      let points = 0;
      let sign = '';
      // check positive or negative answer, associate sign (+ || -) and make sum
      el.answer ? points = +(el.yesPoints) : points = +(el.noPoints);
      el.answer ? sign = el.yesSign : sign = el.noSign;
      sign === '+' ? sum += points : sum -= points;
    });

    // add property 'points' to object
    entry.points = sum;

    this.entryService.addEntry(entry);

    // Change value karma points
    const user = JSON.parse(localStorage.getItem('user'));
    this.karmaService.updateKarmaPoints(user.uid, entry.points);

    this.router.navigate(['/entries']);
  }
}
