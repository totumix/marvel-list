import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: MainViewComponent },
];

@NgModule({
  declarations: [
    MainViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainViewModule { }
