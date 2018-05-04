import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthorizationService } from '../authorization.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'test-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterContentInit {

  public loginForm:             FormGroup;
  public emailFormControl:      FormControl;
  public passwordFormControl:   FormControl;
  public rememberMeFormControl: FormControl;
  public matcher:               MyErrorStateMatcher;

  constructor(
    private _router:                Router,
    private _title:                 Title,
    private _authorizationService:  AuthorizationService
  ) {
    this.matcher = new MyErrorStateMatcher();
    this._title.setTitle('Login');
  }

  public ngAfterContentInit() {
    if (this._authorizationService.isLoggedIn()) {
      this._router.navigate(['/dashboard']);
    }
  }

  private _createFormControls(): void {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]);
    this.rememberMeFormControl = new FormControl(false);
  }

  private _createForm(): void {
    this.loginForm = new FormGroup({
      email:       this.emailFormControl,
      password:    this.passwordFormControl,
      rememberMe:  this.rememberMeFormControl
    });
  }

  public ngOnInit() {
    this._createFormControls();
    this._createForm();
  }

  public login() {
    if (this.loginForm.valid) {
      this._authorizationService.logIn(this.loginForm.value);
      this._router.navigate(['dashboard']);
    } else {
      this.emailFormControl.markAsTouched();
      this.passwordFormControl.markAsTouched();
    }
  }

}
