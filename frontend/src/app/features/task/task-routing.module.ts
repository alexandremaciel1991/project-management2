import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  { path: '', redirectTo: 'tarefa/novo', pathMatch: 'full' },
  { path: 'editar/:id', component: FormComponent },
  { path: 'novo', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasktRoutingModule {}
