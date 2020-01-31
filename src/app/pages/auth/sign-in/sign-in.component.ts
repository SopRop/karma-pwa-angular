import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  errorMsg: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSignIn(email: string, password: string) {

    this.errorMsg = '';

    this.authService.signIn(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMsg = `Please enter a valid address.`;
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
            console.log('Well, fuck');
        }
    });
  }

}
