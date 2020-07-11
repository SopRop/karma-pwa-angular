import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  errorMsg: string;

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildSignInForm();
  }

  buildSignInForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignIn() {

    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;

    this.errorMsg = '';

    this.authService.signIn(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMsg = `Please enter a valid address.`;
            break;
          case 'auth/user-not-found':
            this.errorMsg = `There is no user corresponding to the given email or password.`;
            break;
          case 'auth/wrong-password':
            this.errorMsg = `There is no user corresponding to the given email or password.`;
            break;
          case 'auth/user-disabled':
            this.errorMsg = `The user corresponding to the given email has been disabled.`;
            break;
          case 'auth/operation-not-allowed':
            this.errorMsg = `Unexpected error. Please come back later.`;
            break;
          default:
            console.log('error :', error);
        }
    });
  }

}
