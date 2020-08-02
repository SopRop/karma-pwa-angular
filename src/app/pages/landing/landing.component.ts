import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { KarmaService } from './../../services/karma/karma.service';

import { User } from '../../services/auth/user';
import { Karma } from '../../services/karma/karma';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user: User;
  karma: Karma;
  userStorage: any;

  constructor(private authService: AuthService,
              private karmaService: KarmaService) { }

  ngOnInit() {
    this.userStorage = JSON.parse(localStorage.getItem('user'));
    this.getUserInfo();
  }

  getUserInfo() {
    this.authService.getUserInfo(this.userStorage)
      .subscribe((user) => {
        this.user = user[0];
        console.log('this', this.user);
        this.getUserKarma();
        return this.user;
      });
  }

  getUserKarma() {
    this.karmaService.getKarma(this.userStorage.uid)
      .subscribe((karma) => {
        this.karma = karma[0];
        console.log('ghisk', this.karma);
        return this.karma;
      });
  }

}
