import { Component, OnInit } from '@angular/core';

import Menu from '../../interfaces/menu';

import { ScreenService } from '../../services/screen.service';

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
      name: 'History',
      url: '/',
      slug: 'history'
    },
    {
      name: 'Profile',
      url: '/profile',
      slug: 'profile'
    }
  ];

  constructor(private screenService: ScreenService) {}

  ngOnInit() {
    this.isPortrait = this.screenService.isPortrait;
  }

}
