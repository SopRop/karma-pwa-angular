import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  movies;

  constructor() { }

  ngOnInit() {

    fetch('https://ghibliapi.herokuapp.com/films/?limit=10')
    .then((response) => response.json())
    .then((json) => {
      this.movies = json;
    });

    console.log('movies', this.movies);
  }

}
