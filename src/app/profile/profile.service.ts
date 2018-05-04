import { Injectable } from '@angular/core';

import { LocalStorageService } from '../shared/services/local-storage.service';
import { Profile } from './profile';

@Injectable()
export class ProfileService {

  constructor(
    private _localStorageService: LocalStorageService,
  ) { }

  public setProfile(data: Profile): void {
    this._localStorageService.setObject('profile', data);
  }

  public getProfile(): Profile {
    return this._localStorageService.getObject('profile');
  }

  public clearProfile(): void {
    this._localStorageService.remove('profile');
  }

}
