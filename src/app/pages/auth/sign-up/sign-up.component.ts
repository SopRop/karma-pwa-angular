import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  errorMsg: string;

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildSignUpForm();
  }

  buildSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignUp() {

    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    this.errorMsg = '';

    this.authService.signUp(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.errorMsg = 'There is already an account with the given email address';
            break;
          case 'auth/invalid-email':
            this.errorMsg = 'The email address is not valid';
            break;
          case 'auth/operation-not-allowed':
            this.errorMsg = 'Unexpected error. Please come back later';
            break;
          case 'auth/weak-password':
            this.errorMsg = 'The password must be at least 6 characters long';
            break;
          default:
            this.errorMsg = 'Unexpected error. Please come back later';
        }
        console.log('error :', error);
    });
  }

}
