import { ITask, ITaskData, ITaskDataInfo } from './../models/tasks.model';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStatus } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  apiUrl = environment.api
  constructor(private http: HttpClient) { }

  getStatus(): Observable<IStatus[]>{
    return this.http.get<IStatus[]>(`${this.apiUrl}/status`);
  }

  createTask(task: any){
    return this.http.post(`${this.apiUrl}/task`, task)
  }

  getTasks(): Observable<ITask[]>{
    return this.http.get<ITask[]>(`${this.apiUrl}/task`)
  }

  deleteTask(task: ITaskDataInfo){
    return this.http.delete(`${this.apiUrl}/task/${task.id}`)
  }

  editTask(task: any, id: number){
    return this.http.put(`${this.apiUrl}/task/${id}`, task)
  }
}
