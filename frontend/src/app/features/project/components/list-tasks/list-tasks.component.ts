import { Component, Input } from '@angular/core';
import { ITask } from '../../model/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailsComponent } from 'src/app/features/task/components/task-details/task-details.component';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent {
  @Input() tasks!: ITask[];

  constructor(public dialog: MatDialog) {}
  showInfo(task: ITask) {
    const dialogRef = this.dialog.open(TaskDetailsComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
