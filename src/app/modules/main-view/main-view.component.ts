import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MarvelService } from 'src/app/core/services/marvel.service';
import { ViewMoreComponent } from './components/view-more/view-more.component';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, AfterViewInit {

  public heroes = [];
  public favComics = [];
  public pagina: number;
  filterPost = '';
  public simpleViewMore: ComponentRef<ViewMoreComponent> = null;
  @ViewChild("viewMore", { read: ViewContainerRef }) viewMoreContainer: ViewContainerRef

  constructor(
    private _marvelService: MarvelService,
    private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.pagina = 1;
    this._marvelService.getHeroes().subscribe(
      res => {
        let { data } = res;
        this.heroes = data.results.map(({ ...hero }) => ({
          items: hero.comics?.items,
          ...hero
        }));
      });
  }

  ngAfterViewInit(): void {
    const viewMoreFactory = this.resolver.resolveComponentFactory(ViewMoreComponent);
    this.simpleViewMore = this.viewMoreContainer.createComponent(viewMoreFactory);
    this.simpleViewMore.instance.closeDialog.pipe(
      filter((comic) => !!comic),
    ).subscribe(comic => {
      const index = this.favComics.findIndex(a => a.id === comic.id);
      if (index < 0) {
        this.favComics.push(comic)
      }
    })
  }

  public async openViewMore(comic) {
    this._marvelService.getComic(comic.resourceURI).subscribe(async res => {
      this.simpleViewMore.instance.toggleModal();
      this.simpleViewMore.instance.comic = await res.data.results[0];
    })

  }

}
