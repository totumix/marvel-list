import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.css']
})
export class MyFavouritesComponent implements OnInit {

  @Input() favComics = [];
  constructor() { }

  ngOnInit(): void {
  }

  deleteFavComic(deleteComic) {
    const index = this.favComics.indexOf(deleteComic);
    this.favComics.splice(index, 1);
  }
}
