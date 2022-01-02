import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.css']
})
export class MyFavouritesComponent implements OnInit {

  @Input() favHeros = [];
  constructor() { }

  ngOnInit(): void {
  }

  deleteFavHero(deleteHero) {
    const index = this.favHeros.indexOf(deleteHero);
    this.favHeros.splice(index, 1);
  }
}
