import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Authorization } from './authorization.interface';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthorizationService {

  private _token = 'Bearer g88EfwFmBj0KOXwU0QVPloe1IHg6QtlFbD5wCRH0A';

  constructor(
    private _localStorageService:   LocalStorageService,
    private _sessionStorageService: SessionStorageService,
    private _profileService:        ProfileService
  ) { }

  private _clearToken(): void {
    this._localStorageService.remove('token');
    this._sessionStorageService.remove('token');
    this._profileService.clearProfile();
  }

  public setToken(value: Authorization, rememberMe: boolean): void {
    this._profileService.setProfile({ email: value.email });
    if (rememberMe) {
      this._localStorageService.set('token', this._token);
    } else {
      this._sessionStorageService.set('token', this._token);
    }
  }

  public getToken(): string {
    const token = this._localStorageService.get('token');
    if (token) {
      return token;
    } else {
      return this._sessionStorageService.get('token');
    }
  }

  public isLoggedIn(): boolean {
    return this.getToken() ? true : false;
  }

  public logIn(data: Authorization): void {
    this.setToken(data, data.rememberMe);
  }

  public logOut(): void {
    this._clearToken();
  }

}
