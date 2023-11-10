import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { IProject } from '../../model/project';
import { ProjectService } from '../../service/project.service';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  formProject!: FormGroup;
  route: string = '';
  id: string = '';
  newForm: boolean = false;
  project!: IProject;
  constructor(
    private projectFormBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.route = this.activateRoute.snapshot.url[0].path;
    this.startForm();
    if (this.route === 'editar') {
      this.id = this.activateRoute.snapshot.url[1].path;
      this.seachById();
    } else {
      this.newForm = true;
    }
  }

  startForm(): void {
    this.formProject = this.projectFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date(), Validators.required],
    });
  }

  seachById(): void {
    this.projectService
      .getProjectById(parseInt(this.id))
      .subscribe((project: IProject) => {
        this.project = project;
        this.formProject.controls['name'].setValue(project.name);
        this.formProject.controls['description'].setValue(project.description);
        this.formProject.controls['date'].setValue(
          moment(project.date).add(1, 'day').format('YYYY-MM-DD')
        );
      });
  }

  saveForm(): void {
    if (this.formProject.touched && this.formProject.dirty) {
      const payload: IProject = {
        name: this.formProject.controls['name'].value,
        description: this.formProject.controls['description'].value,
        date: this.formProject.controls['date'].value,
      };

      if (this.newForm) {
        this.createProject(payload);
      } else {
        (payload.id = this.project.id), this.editProject(payload);
      }
    }
  }

  createProject(payload: IProject): void {
    this.projectService.createProject(payload).subscribe({
      next: (res) => {
        this.snackBar.openSnackBar('Formulario salvo com sucess');
        this.redirectRoute();
      },
      error: (err) => this.snackBar.openSnackBar('Ocorreu um erro!'),
    });
  }

  editProject(payload: IProject): void {
    this.projectService.editProject(payload).subscribe({
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
