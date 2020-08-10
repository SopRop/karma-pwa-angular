import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  passwordForm: FormGroup;
  errorMsg: string;

  constructor(public authService: AuthService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildPasswordForm();
  }

  buildPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  onPassword() {
    const email = this.passwordForm.value.email;

    this.errorMsg = '';

    this.authService.forgotPassword(email)
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMsg = `Please enter a valid address.`;
            break;
          case 'auth/user-not-found':
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
