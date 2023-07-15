import { TasksService } from './../../services/tasks.service';
import { Component, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks-create.component.scss']
})
export class TasksCreateComponent implements OnInit {

  constructor(
    private readonly tasksService: TasksService,
    public dialogRef: MatDialogRef<TasksCreateComponent>
    ){}

  ngOnInit(){
  }

  closeModal(){
    this.dialogRef.close()
  }

  createTask(form: any){
    this.tasksService.createTask(form)
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
