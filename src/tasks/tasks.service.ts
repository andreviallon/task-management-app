import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  public async getTaskById(id: string): Promise<Task> {
    try {
      return await this.tasksRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException(`Task with id '${id}' not found`);
    }
  }
}
