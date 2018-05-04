import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthorizationService } from '../authorization/authorization.service';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/profile';

@Component({
  selector: 'test-app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public activeRoute: string;
  public user:        Profile;

  constructor(
    private _authorizationService:  AuthorizationService,
    private _profileService:        ProfileService,
    private _router:                Router
  ) {
    _router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        this.activeRoute = value.url;
      }
    });
  }

  public ngOnInit() {
    this.user = this._profileService.getProfile();
  }

  public logOut() {
    this._authorizationService.logOut();
  }


}
