import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';

import { AuthorizationService } from './../authorization.service';


describe('LoginComponent', () => {

  let component: LoginComponent,
    fixture: ComponentFixture<LoginComponent>,
    authorizationService: AuthorizationService,
    router: Router,
    location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatButtonModule,
        SharedModule.forRoot(),
        RouterTestingModule.withRoutes([])
      ],
      providers: [],
      declarations: [
        LoginComponent
      ]
    })
      .compileComponents();
  }));

  function updateForm(value) {
    component.loginForm.controls.email.setValue(value.email);
    component.loginForm.controls.password.setValue(value.password);
    component.loginForm.controls.rememberMe.setValue(value.rememberMe);
  }

  const validData = {
    email: 'tyu@tyu.com',
    password: '123456789',
    rememberMe: true
  };

  const invalidData = {
    email: 'tyutyu.com',
    password: '1234',
    rememberMe: true
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authorizationService = TestBed.get(AuthorizationService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loginForm', () => {
    const loginForm = component.loginForm;
    expect(loginForm).toBeDefined();
  });

  it('should be define login method', () => {
    expect(component.login).toBeDefined();
  });

  it('page title should be Login', () => {
    const _title = TestBed.get(Title);
    expect(_title.getTitle()).toBe('Login');
  });

  it('page title should be Login', () => {
    const _title = TestBed.get(Title);
    expect(_title.getTitle()).toBe('Login');
  });


  it('form value should update from form changes', fakeAsync(() => {
    updateForm(validData);
    expect(component.loginForm.value).toEqual(validData);
  }));

  it('isValid should be true when form is valid', fakeAsync(() => {
    spyOn(authorizationService, 'logIn');
    updateForm(validData);
    expect(component.loginForm.valid).toBeTruthy();
    component.login();
    expect(authorizationService.logIn).toHaveBeenCalledWith(component.loginForm.value);
  }));

  it('isValid should be false when form is invalid', fakeAsync(() => {
    spyOn(authorizationService, 'logIn');
    updateForm(invalidData);
    expect(component.loginForm.valid).toBeFalsy();
    component.login();
    expect(authorizationService.logIn).not.toHaveBeenCalled();
  }));

  it('should check isLoggedIn ngAfterContentInit (return false)', () => {
    spyOn(authorizationService, 'isLoggedIn').and.returnValue(false);
    component.ngAfterContentInit();
    expect(authorizationService.isLoggedIn).toHaveBeenCalled();
  });

  it('should check isLoggedIn ngAfterContentInit (reutrn true)', fakeAsync(() => {
    spyOn(authorizationService, 'isLoggedIn').and.returnValue(true);
    spyOn(router, 'navigate');
    component.ngAfterContentInit();
    expect(authorizationService.isLoggedIn).toHaveBeenCalled();

    expect(authorizationService.isLoggedIn()).toBeTruthy();
    expect(router.navigate).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

});
