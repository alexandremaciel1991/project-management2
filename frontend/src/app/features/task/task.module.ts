import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasktRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [TaskDetailsComponent, FormComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TasktRoutingModule,
  ],
})
export class TaskModule {}
