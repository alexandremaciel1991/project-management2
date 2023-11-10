import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'projeto', pathMatch: 'full' },
  {
    path: 'projeto',
    loadChildren: () =>
      import('./features/project/project.module').then((m) => m.ProjectModule),
  },
  {
    path: 'tarefa',
    loadChildren: () =>
      import('./features/task/task.module').then((m) => m.TaskModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
