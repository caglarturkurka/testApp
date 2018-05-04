import { TestBed, inject } from '@angular/core/testing';

import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService]
    });
  });

  it('should be created', inject([SessionStorageService], (service: SessionStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should be define get method', inject([SessionStorageService], (service: SessionStorageService) => {
    expect(service.get).toBeDefined();
  }));

  it('should be define set method', inject([SessionStorageService], (service: SessionStorageService) => {
    expect(service.set).toBeDefined();
  }));

  it('should be define setObject method', inject([SessionStorageService], (service: SessionStorageService) => {
    expect(service.setObject).toBeDefined();
  }));

  it('should be define getObject method', inject([SessionStorageService], (service: SessionStorageService) => {
    expect(service.getObject).toBeDefined();
  }));

  it('should be define remove method', inject([SessionStorageService], (service: SessionStorageService) => {
    expect(service.remove).toBeDefined();
  }));

  it('should be define clear method', inject([SessionStorageService], (service: SessionStorageService) => {
    expect(service.clear).toBeDefined();
  }));
});
