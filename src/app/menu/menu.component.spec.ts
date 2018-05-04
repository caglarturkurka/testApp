import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProfileService } from '../profile/profile.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { SharedModule } from './../shared/shared.module';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let authorizationService: AuthorizationService;
    let profileService: ProfileService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule.forRoot(),
                RouterTestingModule,
                BrowserAnimationsModule
            ],
            declarations: [MenuComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        authorizationService = TestBed.get(AuthorizationService);
        profileService = TestBed.get(ProfileService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be define logOut method', () => {
        expect(component.logOut).toBeDefined();
    });

    it('logOut must call method authorizationService.logOut', () => {
        spyOn(authorizationService, 'logOut');
        component.logOut();
        expect(authorizationService.logOut).toHaveBeenCalled();
    });

    it('ngOnInit must call get profile method', () => {
        spyOn(profileService, 'getProfile');
        component.ngOnInit();
        expect(profileService.getProfile).toHaveBeenCalled();
    });

});
