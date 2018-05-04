import { TestBed, inject, async } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

describe('ProfileService', () => {

    let localStorageService: LocalStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProfileService,
                LocalStorageService
            ]
        });
    });

    beforeEach(() => {
        localStorageService = TestBed.get(LocalStorageService);
    });

    it('should be created', inject([ProfileService], (service: ProfileService) => {
        expect(service).toBeTruthy();
    }));

    it('should be define setProfile method', inject([ProfileService], (service: ProfileService) => {
        expect(service.setProfile).toBeTruthy();
    }));

    it('should be define getProfile method', inject([ProfileService], (service: ProfileService) => {
        expect(service.getProfile).toBeTruthy();
    }));

    it('should be define clearProfile method', inject([ProfileService], (service: ProfileService) => {
        expect(service.clearProfile).toBeTruthy();
    }));

    it('setProfile method must call LocalStorageService service', async(inject(
        [ProfileService], (service, mockBackend) => {
            spyOn(localStorageService, 'setObject');
            const profile = { email: ' email' };
            service.setProfile(profile);
            expect(localStorageService.setObject).toHaveBeenCalledWith('profile', profile);
        })));

    it('getProfile method must call LocalStorageService service', async(inject(
        [ProfileService], (service, mockBackend) => {
            spyOn(localStorageService, 'getObject');
            service.getProfile();
            expect(localStorageService.getObject).toHaveBeenCalled();
        })));

    it('clearProfile method must call LocalStorageService service', async(inject(
        [ProfileService], (service, mockBackend) => {
            spyOn(localStorageService, 'remove');
            service.clearProfile();
            expect(localStorageService.remove).toHaveBeenCalledWith('profile');
        })));

});
