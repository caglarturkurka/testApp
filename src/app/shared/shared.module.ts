import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { FooterComponent } from './components/footer/footer.component';

import { LocalStorageService } from './services/local-storage.service';
import { SessionStorageService } from './services/session-storage.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { ProfileService } from '../profile/profile.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

export const providers = [
  LocalStorageService,
  SessionStorageService,
  AuthorizationService,
  ProfileService
];

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
  ],
  exports: [
    HeaderComponent,
    SubHeaderComponent,
    FooterComponent,
    MatMenuModule,
    MatListModule,
    MatCardModule
  ],
  declarations: [
    HeaderComponent,
    SubHeaderComponent,
    FooterComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [...providers]
    };
  }
}

