import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ChangePassDialogComponent } from './change-pass-dialog/change-pass-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    SharedModule.forRoot()
  ],
  entryComponents: [
    ChangePassDialogComponent
  ],
  declarations: [
    ProfileComponent,
    ChangePassDialogComponent
  ]
})
export class ProfileModule { }
