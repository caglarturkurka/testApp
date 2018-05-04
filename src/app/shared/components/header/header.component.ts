import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'test-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() public title: string;

  constructor() { }

  public ngOnInit() {

  }

}
