import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  constructor(
    public _http: HttpClient
  ) { }

  getEntity(entity): Observable<any> {
    let url = `http://gateway.marvel.com/v1/public/${entity}?ts=1&apikey=ee87a5cc32b1b1a21cd53721d9cd4a32&hash=786f85f258daa7b7a76f3647cc57346d`;
    return this._http.get(url)
  }

  getComic(comicUrl): Observable<any> {
    return this._http.get(`${comicUrl}?ts=1&apikey=ee87a5cc32b1b1a21cd53721d9cd4a32&hash=786f85f258daa7b7a76f3647cc57346d`)
  }
}
