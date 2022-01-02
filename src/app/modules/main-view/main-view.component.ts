import { AfterContentInit, AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MarvelService } from 'src/app/core/services/marvel.service';
import { ViewMoreComponent } from './components/view-more/view-more.component';
import { iif } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit, AfterViewInit {

  public heroes = [];
  public favHeros = [];
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
        this.heroes = data.results;
      });
  }

  ngAfterViewInit(): void {
    const viewMoreFactory = this.resolver.resolveComponentFactory(ViewMoreComponent);
    this.simpleViewMore = this.viewMoreContainer.createComponent(viewMoreFactory);
    this.simpleViewMore.instance.closeDialog.pipe(
      filter((hero) => !!hero),
    ).subscribe(hero => {
      const index = this.favHeros.indexOf(hero);
      console.log(index, "index")
      if (index < 0) {
        this.favHeros.push(hero)
      }
    })
  }

  public openViewMore(hero) {
    this.simpleViewMore.instance.toggleModal();
    this.simpleViewMore.instance.hero = hero;
  }

  

}
