import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view.component';
import { RouterModule, Routes } from '@angular/router';
import { MarvelService } from 'src/app/core/services/marvel.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewMoreComponent } from './components/view-more/view-more.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { MyFavouritesComponent } from './components/my-favourites/my-favourites.component';

const routes: Routes = [
  { path: "", component: MainViewComponent },
];

@NgModule({
  declarations: [
    MainViewComponent,
    ViewMoreComponent,
    FilterPipe,
    MyFavouritesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [MarvelService],
  entryComponents: [ViewMoreComponent]
})
export class MainViewModule { }
