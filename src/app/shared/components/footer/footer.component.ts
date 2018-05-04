import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'test-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input()  public btnName:   string;
  @Input()  public notLine:   boolean;
  @Output() public btnEvent:  EventEmitter<Event> = new EventEmitter<Event>();

  constructor() { }

  ngOnInit() {
  }

  public clickBtn(event: Event): void {
    this.btnEvent.next(event);
  }

}
