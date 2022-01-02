import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from 'src/app/core/models/Hero.model';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent implements OnInit {

  public visible;
  @Output() closeDialog: EventEmitter<Hero> = new EventEmitter<Hero>()
  @Input() hero;
  constructor() { }

  ngOnInit(): void {
  }

  public toggleModal() {
    this.visible = !this.visible;
  }

  public onNoClick() {
    this.visible = false;
    this.closeDialog.emit()
  }

  setHero() {
    this.visible = false;
    this.closeDialog.emit(this.hero)
  }

}
