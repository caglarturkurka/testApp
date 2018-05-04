import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should be define get method', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service.get).toBeDefined();
  }));

  it('should be define set method', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service.set).toBeDefined();
  }));

  it('should be define setObject method', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service.setObject).toBeDefined();
  }));

  it('should be define getObject method', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service.getObject).toBeDefined();
  }));

  it('should be define remove method', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service.remove).toBeDefined();
  }));

  it('should be define clear method', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service.clear).toBeDefined();
  }));
});
