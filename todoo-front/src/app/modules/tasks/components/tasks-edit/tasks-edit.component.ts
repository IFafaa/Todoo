import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.scss']
})
export class TasksEditComponent {

    constructor(
    private readonly tasksService: TasksService,
    public dialogRef: MatDialogRef<TasksEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){}

  closeModal(){
    this.dialogRef.close()
  }

  editTask(form: any){
    this.tasksService.editTask(form, this.data.task.id)
    .subscribe({
      next: () => {
        this.dialogRef.close('success')
      },
      error: () => {
        this.closeModal()
      }
    })
  }
}
