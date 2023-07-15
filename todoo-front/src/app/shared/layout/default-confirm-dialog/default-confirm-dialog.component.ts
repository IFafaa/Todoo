import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { IConfirConfirmDialog } from 'src/app/core/services/confirm.service';

@Component({
  selector: 'app-default-confirm-dialog',
  templateUrl: './default-confirm-dialog.component.html',
  styleUrls: ['./default-confirm-dialog.component.scss']
})
export class DefaultConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: DialogRef<DefaultConfirmDialogComponent>,
     @Inject(DIALOG_DATA) public data: IConfirConfirmDialog
  ){

  }

  ngOnInit(){
  }

  reject(){
    this.dialogRef.close()
  }

  confirm(){
    this.data.accept()
    this.dialogRef.close()
  }
}
