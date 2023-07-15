import { UserConfigChangeEmailComponent } from './../user-config-change-email/user-config-change-email.component';
import { DialogRef } from '@angular/cdk/dialog';
import { UserService } from './../../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserConfigChangePhotoComponent } from '../user-config-change-photo/user-config-change-photo.component';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  user: any

  constructor(
    private userService:UserService,
    private dialogRef: DialogRef<UserConfigComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.user = this.userService.getUser()
  }

  closeModal(){
    this.dialogRef.close()
  }

  changeEmail(){
    const dialogRef = this.dialog.open(UserConfigChangeEmailComponent, {
      width: '20vw'
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getUser()
      console.log('this.userService.getUser()',this.userService.getUser());

    })
  }

  changeUserPhoto(){
    const dialogRef = this.dialog.open(UserConfigChangePhotoComponent, {
      width: '30vw'
    })
    dialogRef.afterClosed().subscribe(() => {

    })
  }
}
