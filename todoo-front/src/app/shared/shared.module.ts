import { HeaderComponent } from './../core/components/header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from './layout/default-button/default-button.component';
import { DefaultPageComponent } from './layout/default-page/default-page.component';
import {MatButtonModule} from '@angular/material/button';
import { DefaultContentComponent } from './layout/default-content/default-content.component';
import {DialogModule} from '@angular/cdk/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultConfirmDialogComponent } from './layout/default-confirm-dialog/default-confirm-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { UserConfigComponent } from '../modules/user/components/user-config/user-config.component';
import { UserConfigChangeEmailComponent } from '../modules/user/components/user-config-change-email/user-config-change-email.component';
import { UserConfigChangePhotoComponent } from '../modules/user/components/user-config-change-photo/user-config-change-photo.component';
import { DefaultModalComponent } from './layout/default-modal/default-modal.component';



const components = [
  DefaultButtonComponent,
  DefaultPageComponent,
  DefaultContentComponent,
  HeaderComponent,
  DefaultModalComponent

]

const configComponents = [
  UserConfigComponent,
  UserConfigChangeEmailComponent,
  UserConfigChangePhotoComponent
]

const angular = [
  FormsModule,
  DialogModule,
  ReactiveFormsModule
]

const lib = [
  NgxSpinnerModule,
]

const material = [
  MatButtonModule,
  DialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDialogModule,
  MatMenuModule,
  MatDividerModule
]

@NgModule({
  declarations: [
    ...components,
    DefaultConfirmDialogComponent,
    ...configComponents,
  ],
  imports: [
    CommonModule,
    ...material,
    ...angular
  ],
  exports: [...components,...material, ...angular, ...lib,],
  providers: [DialogModule],

})
export class SharedModule { }
