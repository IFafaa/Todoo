import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { DefaultConfirmDialogComponent } from 'src/app/shared/layout/default-confirm-dialog/default-confirm-dialog.component';

export interface IConfirConfirmDialog{
  title: string,
  message: string,
  accept: Function
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(config: IConfirConfirmDialog){
    this.dialog.open(DefaultConfirmDialogComponent, {
      data: config
    })
  }

}
