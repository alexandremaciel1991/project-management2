/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

@Controller('projeto')
export class ProjectController {
  constructor(private readonly appService: ProjectService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.appService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.appService.delete(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Project | null> {
    return this.appService.findOne(id);
  }

  @Post()
  async createProject(@Body() project: Project): Promise<Project> {
    return this.appService.create(project);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() project: Project,
  ): Promise<Project> {
    return this.appService.updateProject(id, project);
  }
}
