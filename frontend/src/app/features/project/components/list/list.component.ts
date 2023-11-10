import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IProject } from '../../model/project';
import { MatPaginator } from '@angular/material/paginator';
import { ProjectService } from '../../service/project.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/components/snack-bar/snack-bar.service';
import { ITask } from '../../model/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayedColumns: string[] = ['name', 'date', 'edit', 'delete'];
  dataSource = new MatTableDataSource<IProject>([]);
  projects: IProject[] = [];
  panelOpenState = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.getProjects();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProjects() {
    this.projectService.getProjects().subscribe((projects: IProject[]) => {
      this.projects = projects;
      this.dataSource.data = this.projects;
    });
  }

  editRedirect(project: IProject) {
    this.router.navigate(['projeto', 'editar', project.id]);
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe({
      next: (resposta) => {
        this.snackBar.openSnackBar('Projeto deletado com sucesso');
        this.getProjects();
      },
      error: (err) => this.snackBar.openSnackBar('Ocorreu um erro!'),
    });
  }

  newProject() {
    this.router.navigate(['projeto', 'novo']);
  }
  newTask() {
    this.router.navigate(['tarefa', 'novo']);
  }
}
