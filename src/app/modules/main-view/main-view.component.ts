import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MarvelService } from 'src/app/core/services/marvel.service';
import { ViewMoreComponent } from './components/view-more/view-more.component';
import { filter, map, mergeMap } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { forkJoin, from } from 'rxjs';
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, AfterViewInit {

  public heroes = [];
  public favComics = [];
  public allComics = []
  public page: number;
  filterComic = '';
  public simpleViewMore: ComponentRef<ViewMoreComponent> = null;
  @ViewChild("viewMore", { read: ViewContainerRef }) viewMoreContainer: ViewContainerRef

  constructor(
    private _marvelService: MarvelService,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.page = 1;
    this.favComics = JSON.parse(localStorage.getItem('comics'));
    if (!this.favComics) {
      this.favComics = []
    }
    this._marvelService.getEntity('characters').subscribe(
      res => {
        let { data } = res;
        this.heroes = data.results.map(({ ...hero }) => ({
          items: hero.comics?.items,
          ...hero
        }));
        this.heroes.forEach(element => {
          this.allComics = this.allComics.concat(element.items)
        });
      });

  }

  ngAfterViewInit(): void {
    const viewMoreFactory = this.resolver.resolveComponentFactory(ViewMoreComponent);
    this.simpleViewMore = this.viewMoreContainer.createComponent(viewMoreFactory);
    this.simpleViewMore.instance.closeDialog.pipe(
      filter((comic) => !!comic),
    ).subscribe(comic => {
      this.setComics(comic);
    })
  }

  setComics(comic) {
    const index = this.favComics.findIndex(a => a.id === comic.id);
    if (index < 0) {
      this.favComics.push(comic)
      localStorage.setItem('comics', JSON.stringify(this.favComics))
    }
  }

  public async openViewMore(comic) {
    this._marvelService.getComic(comic.resourceURI).subscribe(async res => {
      this.simpleViewMore.instance.toggleModal();
      this.simpleViewMore.instance.comic = await res.data.results[0];
    })
  }

  setRamdonComics() {
    let randomComics =
      [...this.allComics].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 3);
    const obs = from(randomComics)
    obs.pipe(
      mergeMap(comic => forkJoin({
        comic: (this._marvelService.getComic(comic.resourceURI))
      })
      )
    ).subscribe(res =>
      this.setComics(res.comic.data.results[0])
    )
  }


}
