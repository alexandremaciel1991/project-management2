import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TaskModule } from '../task/task.module';

@NgModule({
  declarations: [FormComponent, ListComponent, ListTasksComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TaskModule,
  ],
})
export class ProjectModule {}
