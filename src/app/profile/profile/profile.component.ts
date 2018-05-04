import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProfileService} from '../../profile/profile.service';
import {Profile} from '../../profile/profile';

import {ChangePassDialogComponent} from '../change-pass-dialog/change-pass-dialog.component';


@Component({
  selector: 'test-app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public profileForm: FormGroup;
  public firstNameFormControl: FormControl;
  public lastNameFormControl: FormControl;
  public emailFormControl: FormControl;
  public phoneFormControl: FormControl;

  constructor(
    private _router: Router,
    private _profileService: ProfileService,
    private _title: Title,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this._title.setTitle('Profile');
  }

  private _createFormControls(): void {

    const profile: Profile = this._profileService.getProfile();

    this.firstNameFormControl = new FormControl(profile ? profile.firstName : '', [
      Validators.maxLength(255)
    ]);
    this.lastNameFormControl = new FormControl(profile ? profile.lastName : '', [
      Validators.maxLength(255)
    ]);
    this.emailFormControl = new FormControl(profile ? profile.email : '', [
      Validators.required,
      Validators.email,
    ]);
    this.phoneFormControl = new FormControl(profile ? profile.phoneNumber : '', [
    ]);
  }

  private _createForm(): void {
    this.profileForm = new FormGroup({
      firstName: this.firstNameFormControl,
      lastName: this.lastNameFormControl,
      email: this.emailFormControl,
      phoneNumber: this.phoneFormControl,
    });
  }

  public ngOnInit() {
    this._createFormControls();
    this._createForm();
  }

  public changePassword() {
    const dialogRef = this.dialog.open(ChangePassDialogComponent, {
      width: '550px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public create(event: Event): void {
    if (this.profileForm.valid) {
      this._profileService.setProfile(this.profileForm.value);
      this.snackBar.open('Profile updated.', `Done!`, {duration: 4000});
    } else {
      this.emailFormControl.markAsTouched();
    }
  }

}
