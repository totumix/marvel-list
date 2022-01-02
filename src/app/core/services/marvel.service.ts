import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  public url = 'http://gateway.marvel.com/v1/public/comics?ts=1&apikey=ee87a5cc32b1b1a21cd53721d9cd4a32&hash=786f85f258daa7b7a76f3647cc57346d';
  constructor(
    public _http: HttpClient
  ) { }

  getHeroes(): Observable<any> {
    return this._http.get(this.url)
  }
}
