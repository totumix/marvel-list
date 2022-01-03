import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.scss']
})
export class ViewMoreComponent {

  public visible;
  @Output() closeDialog: EventEmitter<any> = new EventEmitter<any>()
  @Input() comic;
  constructor() { }

  public toggleModal() {
    this.visible = !this.visible;
  }

  public onNoClick() {
    this.visible = false;
    this.closeDialog.emit()
  }

  setComic() {
    this.visible = false;
    this.closeDialog.emit(this.comic)
  }

}
