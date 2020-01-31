import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  errorMsg: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp(email, password) {
    console.log('onSign :');

    this.errorMsg = '';

    this.authService.signUp(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.errorMsg = `There is already an account with the given email address.`;
            break;
          case 'auth/invalid-email':
            this.errorMsg = `The email address is not valid.`;
            break;
          case 'auth/operation-not-allowed':
            this.errorMsg = `Unexpected error. Please come back later.`;
            break;
          case 'auth/weak-password':
            this.errorMsg = `The password must be at least 6 characters long.`;
            break;
          default:
            console.log('Well, fuck');
        }
    });
  }

}
