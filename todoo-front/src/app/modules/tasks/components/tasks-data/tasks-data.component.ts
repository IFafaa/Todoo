import { ITaskData, ITaskDataInfo } from '../../models/tasks.model';
import { TasksService } from './../../services/tasks.service';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tasks-data',
  templateUrl: './tasks-data.component.html',
  styleUrls: ['./tasks-data.component.scss']
})
export class TasksDataComponent {

  @Input() tasks!: ITaskDataInfo[]
  @Output() deleteTaskCallback: EventEmitter<ITaskDataInfo> = new EventEmitter()
  @Output() editTaskCallback: EventEmitter<ITaskDataInfo> = new EventEmitter()

  constructor(
  ) {

  }

  editTask(task: ITaskDataInfo){
    this.editTaskCallback.emit(task)
  }

  deleteTask(task: ITaskDataInfo){
    this.deleteTaskCallback.emit(task)
  }
}
