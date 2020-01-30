import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../services/auth/user';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  users: Observable<User[]>;
  userConnected: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.users = this.authService.getUsersList().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    setTimeout(() => {
      console.log('this.users :', this.users);
    }, 2000);

    this.users.subscribe(v => console.log('value :', v));
  }

}
