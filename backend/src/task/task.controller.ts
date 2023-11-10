/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tarefa')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll() {
    return 'All';
  }
  @Get(':id/projeto')
  findByProject(@Param('id') id: number): Promise<Task[]> {
    return this.taskService.findByProject(id);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<string> {
    return this.taskService.deleteTask(id);
  }

  @Post()
  async createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() task: Task): Promise<Task> {
    return this.taskService.updateStatus(id, task);
  }
}
