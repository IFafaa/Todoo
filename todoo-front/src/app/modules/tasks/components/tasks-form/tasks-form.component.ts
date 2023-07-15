import { TasksService } from './../../services/tasks.service';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ITaskData, ITaskDataInfo } from '../../models/tasks.model';
import { IStatus } from '../../models/status.model';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.scss'],
})
export class TasksFormComponent implements OnInit {
  @Input() task?: ITaskDataInfo
  @Output() formCallback: EventEmitter<ITaskData> = new EventEmitter()
  @Output() cancellCallback: EventEmitter<null> = new EventEmitter()
  form!: FormGroup;
  status!: IStatus[]

  constructor(
    private readonly fb: FormBuilder,
    @Inject(DIALOG_DATA) public readonly data: any
    ) {}

  ngOnInit() {
    this.getStatus()
    this.createForm();
    this.setFormValues()
  }

  getStatus(){
    this.status = this.data.status
  }

  createForm(){
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      status: ['', [Validators.required]],
      description: ['']
    })
  }

  setFormValues(){
    if(this.task){
      this.form.patchValue({
        name: this.task?.name,
        status: this.task?.status,
        description: this.task?.description
      })
    }
  }

  closeModal(){
    this.cancellCallback.emit()
  }

  sendForm(){
    if(this.form.invalid){
      return
    }
    this.formCallback.emit(<ITaskData>this.form.value)
  }
}
