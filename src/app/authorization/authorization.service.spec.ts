import { async, TestBed, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthorizationService } from './authorization.service';
import { SessionStorageService } from '../shared/services/session-storage.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ProfileService } from '../profile/profile.service';

import { SharedModule } from './../shared/shared.module';

describe('AuthorizationService', () => {

  let localStorageService: LocalStorageService;
  let profileService: ProfileService;
  let sessionStorageService: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule.forRoot()
      ],
      providers: [
        AuthorizationService,
        LocalStorageService,
        SessionStorageService,
        ProfileService
      ]
    });
  });

  beforeEach(() => {
    localStorageService = TestBed.get(LocalStorageService);
    profileService = TestBed.get(ProfileService);
    sessionStorageService = TestBed.get(SessionStorageService);
  });

  it('should be created', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));

  it('should be define logOut method', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.logOut).toBeTruthy();
  }));

  it('should be define setToken method', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.setToken).toBeTruthy();
  }));

  it('should be define getToken method', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.setToken).toBeTruthy();
  }));

  it('should be define isLoggedIn method', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.isLoggedIn).toBeTruthy();
  }));

  it('should be define logIn method', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service.logIn).toBeTruthy();
  }));

  it('setToken method must set token and set profile email', async(inject(
    [AuthorizationService], (service, mockBackend) => {
      const mockToken = 'Bearer g88EfwFmBj0KOXwU0QVPloe1IHg6QtlFbD5wCRH0A';
      spyOn(localStorageService, 'set');
      spyOn(profileService, 'setProfile');
      service.setToken({ email: ' email' }, true);
      expect(profileService.setProfile).toHaveBeenCalledWith({ email: ' email' });
      expect(localStorageService.set).toHaveBeenCalledWith('token', mockToken);
    })));

  it('setToken method with Don`t Remember Me option', async(inject(
    [AuthorizationService], (service, mockBackend) => {
      const mockToken = 'Bearer g88EfwFmBj0KOXwU0QVPloe1IHg6QtlFbD5wCRH0A';
      spyOn(sessionStorageService, 'set');
      spyOn(profileService, 'setProfile');
      service.setToken({ email: ' email' }, false);
      expect(profileService.setProfile).toHaveBeenCalledWith({ email: ' email' });
      expect(sessionStorageService.set).toHaveBeenCalledWith('token', mockToken);
    })));

  it('getToken method must return token', async(inject(
    [AuthorizationService], (service, mockBackend) => {
      const mockToken = 'Bearer g88EfwFmBj0KOXwU0QVPloe1IHg6QtlFbD5wCRH0A';
      spyOn(localStorageService, 'get').and.returnValue(mockToken);
      expect(service.getToken()).toBeDefined();
      service.getToken();
      expect(localStorageService.get).toHaveBeenCalledWith('token');
    })));

  it('_clearToken method must clear token', async(inject(
    [AuthorizationService], (service, mockBackend) => {
      spyOn(localStorageService, 'remove');
      service._clearToken();
      expect(localStorageService.remove).toHaveBeenCalledWith('token');
    })));

  it('isLoggedIn method must call getToken method', async(inject(
    [AuthorizationService], (service, mockBackend) => {
      spyOn(service, 'getToken');
      service.isLoggedIn();
      expect(service.getToken).toHaveBeenCalled();
    })));

  it('logIn method must call setToken method', async(inject(
    [AuthorizationService], (service, mockBackend) => {
      const data = {
        email: 'test@test.com',
        password: '12345678',
        rememberMe: true
      };
      spyOn(service, 'setToken');
      service.logIn(data, data.rememberMe);
      expect(service.setToken).toHaveBeenCalled();
    })));

  it('logOut method must call _clearToken method', async(inject(
    [AuthorizationService], (service, mockBackend) => {
      spyOn(service, '_clearToken');
      service.logOut();
      expect(service._clearToken).toHaveBeenCalled();
    })));

});
