import { TasksEditComponent } from './../../components/tasks-edit/tasks-edit.component';
import { ConfirmService } from './../../../../core/services/confirm.service';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from './../../services/tasks.service';
import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { TasksCreateComponent } from '../../components/tasks-create/tasks-create.component';
import { IStatus } from '../../models/status.model';
import { ITask, ITaskData, ITaskDataInfo } from '../../models/tasks.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks!: ITask[]
  status!: IStatus[]

  constructor(
    private readonly tasksService: TasksService,
    private dialog: MatDialog,
    private confirmService: ConfirmService
    ) {

  }

  ngOnInit(): void {
    this.getTasks()
    this.getStatus()
  }

  getTasks(){
    this.tasksService.getTasks().subscribe({
      next: (res) => this.tasks = res
    })
  }

  getStatus(){
    this.tasksService.getStatus().subscribe({
      next: (res) => this.status = res
    })
  }

  editTask(task: ITaskData){
   const data = {
    status: this.status,
    task: task
    }
    console.log(data);
    const dialogRef = this.dialog.open(TasksEditComponent, {
      width: '65vw',
      data: data
    })
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if(res) this.getTasks()
      }
    })
  }



  deleteTask(task: ITaskDataInfo){
    this.confirmService.confirmDialog({
      title: 'Deletar tarefa',
      message: 'Tem certeza que deseja deletar essa tarefa?',
      accept: () => {
        this.tasksService.deleteTask(task).subscribe({
          next: (res) => {
            this.getTasks()
          }
        })
      }
    })
  }

  openCreateTask(){
    const data = {
      status: this.status
    }
    const dialogRef = this.dialog.open(TasksCreateComponent, {
      width: '65vw',
      data: data
    })
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if(res) this.getTasks()
      }
    })
  }

  get hasTasks(){
    return this.tasks.filter((task) => task.data.length).length > 0
  }

}
