import { Component, OnInit } from '@angular/core';

import Menu from '../../interfaces/menu';

import { ScreenService } from '../../services/screen/screen.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isPortrait: boolean;
  isLoggedIn: Observable<boolean>;

  menus: Menu[] = [
    {
      name: 'Home',
      url: '/',
      slug: 'home'
    },
    {
      name: 'Entries',
      url: '/entries',
      slug: 'entries'
    },
    {
      name: 'Profile',
      url: '/profile',
      slug: 'profile'
    },
    {
      name: 'Question',
      url: '/question',
      slug: 'question'
    }
  ];

  constructor(private screenService: ScreenService,
              public authService: AuthService
              ) {

    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.isPortrait = this.screenService.isPortrait;
  }

}
