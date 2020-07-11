import { Component, OnInit } from '@angular/core';

import Menu from '../../interfaces/menu';

import { ScreenService } from '../../services/screen/screen.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isPortrait: boolean;

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
    }
  ];

  constructor(private screenService: ScreenService,
              public authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.isPortrait = this.screenService.isPortrait;
  }

}
