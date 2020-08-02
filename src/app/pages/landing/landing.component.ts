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

  user: any;
  karma: any;
  userStorage = JSON.parse(localStorage.getItem('user'));

  constructor(private authService: AuthService,
              private karmaService: KarmaService) { }

  ngOnInit() {
    this.getUserInfo();
    this.getUserKarma();
    // this.karmaService.updateKarmaPoints(this.userStorage.uid, 1000);
  }

  getUserInfo() {
    this.authService.getUserInfo(this.userStorage.uid)
    .then(data => {
      Object.assign(data);
      this.user = data;
      return this.user;
    });
  }

  getUserKarma() {
    this.karmaService.getKarma(this.userStorage.uid)
      .subscribe((karma) => {
        this.karma = karma[0];
        return this.karma;
      });
  }
}
