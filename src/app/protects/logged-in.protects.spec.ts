import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';

import { LoggedInProtects } from './logged-in.protects';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization/authorization.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { ProfileService } from '../profile/profile.service';

describe('LoggedInProtects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      providers: [
        LoggedInProtects,
        AuthorizationService,
        LocalStorageService,
        SessionStorageService,
        ProfileService
      ]
    });
  });

  it('should be define guard', inject([LoggedInProtects], (guard: LoggedInProtects) => {
    expect(guard).toBeTruthy();
  }));

  it('checks if a user is valid',

    // inject your guard service AND Router
    async(inject([AuthorizationService, Router], (auth, router) => {

      // add a spy
      spyOn(router, 'navigate');

      expect(auth.isLoggedIn()).toBeFalsy();
    })
    ));

});
