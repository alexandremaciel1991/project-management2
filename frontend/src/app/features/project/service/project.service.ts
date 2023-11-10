import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { Observable } from 'rxjs';
import { IProject } from '../model/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends HttpBaseService {
  private endpoint = 'projeto';
  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getProjects(): Observable<any> {
    return this.httpGet(this.endpoint);
  }

  deleteProject(id: number): Observable<any> {
    return this.httpDelete(`${this.endpoint}/${id}`);
  }

  getProjectById(id: number): Observable<any> {
    return this.httpGet(`${this.endpoint}/${id}`);
  }

  createProject(payload: IProject): Observable<any> {
    return this.httpPost(this.endpoint, payload);
  }

  editProject(payload: IProject): Observable<any> {
    return this.httpPut(`${this.endpoint}/${payload.id}`, payload);
  }

  getTaskByProjectId(id: number): Observable<any> {
    return this.httpGet(`tarefa/${id}/${this.endpoint}`);
  }
}
