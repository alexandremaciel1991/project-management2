import { ITask } from './task';

export interface IProject {
  id?: number;
  name: string;
  description: string;
  date: string;
  tasks?: ITask[];
}
