import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'test-app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent {

  @Input()  public isSelected:  boolean;
  @Output() public createEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() public removeEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  public create(): void {
    this.createEvent.next();
  }

  public remove(): void {
    this.removeEvent.next();
  }

}
