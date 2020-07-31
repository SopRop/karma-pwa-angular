import { QuestionComponent } from './question/question.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule,
  MatButtonToggleModule
} from '@angular/material';

import { FormBuilder,
  FormGroup, Validators,
  ReactiveFormsModule,
  FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule
  ]
})
export class AdminModule { }
