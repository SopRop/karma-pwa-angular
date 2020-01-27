import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  user = {
    nom: 'Sophie',
    karma: 1000,
  };

  constructor() { }

  ngOnInit() {
  }

}
