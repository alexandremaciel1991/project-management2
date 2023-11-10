import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { Observable } from 'rxjs';
import { ITask } from '../../project/model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends HttpBaseService {
  private endpoint = 'tarefa';
  constructor(protected override readonly injector: Injector) {
    super(injector);
  }
  getTasks(): Observable<any> {
    return this.httpGet(this.endpoint);
  }

  deleteTask(id: number): Observable<any> {
    return this.httpDelete(`${this.endpoint}/${id}`);
  }

  getTaskById(id: number): Observable<any> {
    return this.httpGet(`${this.endpoint}/${id}`);
  }

  createTask(payload: ITask): Observable<any> {
    return this.httpPost(this.endpoint, payload);
  }

  editTask(payload: ITask): Observable<any> {
    return this.httpPut(`${this.endpoint}/${payload.id}`, payload);
  }
}
