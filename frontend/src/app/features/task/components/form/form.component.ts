import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProject } from 'src/app/features/project/model/project';
import { ITask } from 'src/app/features/project/model/task';
import { ProjectService } from 'src/app/features/project/service/project.service';
import { TaskService } from '../../service/task.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  formTask!: FormGroup;
  route: string = '';
  id: string = '';
  newForm: boolean = false;
  task!: ITask;
  projects!: IProject[];
  constructor(
    private taskFormBuild: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService,
    private snackBar: SnackBarService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.startForm();
    this.getProjects();

    this.route = this.activateRoute.snapshot.url[0].path;
    this.startForm();
    if (this.route === 'editar') {
      this.id = this.activateRoute.snapshot.url[1].path;
      this.seachById();
    } else {
      this.newForm = true;
    }
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects: IProject[]) => {
      this.projects = projects;
    });
  }

  startForm(): void {
    this.formTask = this.taskFormBuild.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date(), Validators.required],
      projectId: ['', Validators.required],
    });
  }

  seachById(): void {
    this.taskService.getTaskById(parseInt(this.id)).subscribe((task: ITask) => {
      this.task = task;
      this.formTask.controls['name'].setValue(task.name);
      this.formTask.controls['description'].setValue(task.description);
      this.formTask.controls['date'].setValue(
        moment(task.date).add(1, 'day').format('YYYY-MM-DD')
      );
      this.formTask.controls['projectId'].setValue(task.projects);
    });
  }

  saveForm() {
    if (this.formTask.touched && this.formTask.dirty) {
      const payload: ITask = {
        name: this.formTask.controls['name'].value,
        description: this.formTask.controls['description'].value,
        date: this.formTask.controls['date'].value,
        status: false,
        projects: this.formTask.controls['projectId'].value,
      };

      if (this.newForm) {
        this.createTask(payload);
      } else {
        (payload.id = this.task.id), this.editTask(payload);
      }
    }
  }
  createTask(payload: ITask) {
    this.taskService.createTask(payload).subscribe({
      next: (res) => {
        this.snackBar.openSnackBar('Formulario salvo com sucess');
        this.redirectRoute();
      },
      error: (err) => this.snackBar.openSnackBar('Ocorreu um erro!'),
    });
  }

  editTask(payload: ITask): void {
    this.taskService.editTask(payload).subscribe({
      next: (res) => {
        this.redirectRoute();
      },
      error: (err) => this.snackBar.openSnackBar('Ocorreu um erro!'),
    });
  }

  redirectRoute(): void {
    this.router.navigate(['projeto']);
  }
}
