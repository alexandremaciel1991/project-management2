import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask } from 'src/app/features/project/model/task';
import { TaskService } from '../../service/task.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
    private taskService: TaskService,
    private snackBar: SnackBarService
  ) {}

  updateStatus() {
    let task = this.data;
    task.status = true;
    this.taskService.editTask(task).subscribe((res) => {
      this.snackBar.openSnackBar('Tarefa atualizada');
      this.dialogRef.close();
    });
  }
}
