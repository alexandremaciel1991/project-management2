/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository, TypeORMError } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  findOneById(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id: id });
  }

  findByProject(id: number) {
    return this.taskRepository.find({
      relations: {
        projects: true,
      },
      where: {
        projects: {
          id: id,
        },
      },
    });
  }

  async deleteTask(id: number): Promise<string> {
    const res = await this.taskRepository
      .delete(id)
      .then((res) => {
        if (res.affected > 0) {
          return 'Deletado com Sucesso';
        } else {
          throw new HttpException(
            'Tarefa não encontrada',
            HttpStatus.NOT_FOUND,
          );
        }
      })
      .catch((err: TypeORMError) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
    return res;
  }

  async createTask(task: Task): Promise<Task> {
    const newTask = await this.taskRepository.create(task);
    const res = await this.taskRepository
      .save(newTask)
      .then((res) => {
        return res;
      })
      .catch((err: TypeORMError) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
    return res;
  }

  async updateStatus(id: number, task: Task): Promise<Task> {
    const res = await this.taskRepository
      .update(id, task)
      .then((res) => {
        if (res.affected > 0) {
          return this.findOneById(id);
        } else {
          throw new HttpException(
            'Tarefa não encontrada',
            HttpStatus.NOT_FOUND,
          );
        }
      })
      .catch((err: TypeORMError) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
    return res;
  }
}
