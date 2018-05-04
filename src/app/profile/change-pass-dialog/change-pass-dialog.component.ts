import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'test-app-change-pass-dialog',
  templateUrl: './change-pass-dialog.component.html',
  styleUrls: ['./change-pass-dialog.component.css']
})
export class ChangePassDialogComponent implements OnInit {

  public passForm:                    FormGroup;
  public oldPasswordFormControl:      FormControl;
  public passwordFormControl:         FormControl;
  public confirmPasswordFormControl:  FormControl;

  public matcher:     MyErrorStateMatcher;

  constructor(
    public dialogRef:  MatDialogRef<ChangePassDialogComponent>,
    public snackBar:   MatSnackBar
  ) {
    this.matcher = new MyErrorStateMatcher();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  private _passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      c.get('confirmPassword').setErrors({ matcher: true });
      return { invalid: true };
    } else {
      c.get('confirmPassword').setErrors(null);
    }
  }

  private _createFormControls(): void {
    this.oldPasswordFormControl = new FormControl('', Validators.required);
    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]);
    this.confirmPasswordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]);
  }

  private _createForm(): void {
    this.passForm = new FormGroup({
      password:         this.passwordFormControl,
      oldPassword:      this.oldPasswordFormControl,
      confirmPassword:  this.confirmPasswordFormControl
    }, this._passwordConfirming);
  }

  public ngOnInit() {
    this._createFormControls();
    this._createForm();
  }

  public apply(event: Event): void {
    if (this.passForm.valid) {
      this.snackBar.open('Password updated.', `Done!`, { duration: 5000 });
      this.dialogRef.close();
    } else {
      this.passwordFormControl.markAsTouched();
      this.oldPasswordFormControl.markAsTouched();
      this.confirmPasswordFormControl.markAsTouched();
    }
  }

}
