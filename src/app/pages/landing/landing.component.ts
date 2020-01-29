import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsersList().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    console.log('this.users :', this.users);
  }

  addUser(test) {
    test = 'wesh';
    this.userService.addUser(test);
  }
}
