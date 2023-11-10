import { Component } from '@angular/core';

interface IMenu {
  description: string;
  route: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  menu: IMenu[] = [
    { description: 'Projetos', route: 'projeto' },
    { description: 'Tarefas', route: 'tarefa' },
  ];
}
