/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: {
        tasks: true,
      },
    });
  }

  findOne(id: number): Promise<Project | null> {
    return this.projectRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async create(project: Project): Promise<Project> {
    const newProject = await this.projectRepository.create(project);
    const result = await this.projectRepository.save(newProject);
    return result;
  }

  async updateProject(id: number, project: Project): Promise<Project> {
    const res = await this.projectRepository
      .update(id, project)
      .then((res) => {
        if (res.affected > 0) {
          return this.findOne(id);
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
