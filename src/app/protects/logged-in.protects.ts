import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AuthorizationService } from '../authorization/authorization.service';

@Injectable()
export class LoggedInProtects implements CanActivate {

  constructor(
    private _authorizationService: AuthorizationService,
    private router:                Router
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isLoggedIn = this._authorizationService.isLoggedIn();
      if (isLoggedIn) {
        return true;
      } else {
        console.log(`You can't view this page.`, `Warning!`);
        this.router.navigate(['auth']);
        return false;
    }
  }
}
