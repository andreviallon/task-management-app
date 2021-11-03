import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';

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

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.createTask(createTaskDto);

    try {
      await this.tasksRepository.save(task);
      return task;
    } catch (error) {
      throw new NotFoundException('Task could not be saved... :(');
    }
  }
}
