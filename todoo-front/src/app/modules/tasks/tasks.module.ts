import { DialogModule } from '@angular/cdk/dialog';
import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksFormComponent } from './components/tasks-form/tasks-form.component';
import { TasksDataComponent } from './components/tasks-data/tasks-data.component';
import { TasksEditComponent } from './components/tasks-edit/tasks-edit.component';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { TasksCreateComponent } from './components/tasks-create/tasks-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '', component: TasksListComponent
  },

]

@NgModule({
  declarations: [
    TasksFormComponent,
    TasksListComponent,
    TasksCreateComponent,
    TasksEditComponent,
    TasksDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [

  ]
})
export class TasksModule { }
