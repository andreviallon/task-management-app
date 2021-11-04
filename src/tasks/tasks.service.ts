import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { TaskStatusEnum } from '../task-status.interface';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  public getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  public async getTaskById(id: string): Promise<Task> {
    try {
      return await this.tasksRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException(`Task with id '${id}' not found... :(`);
    }
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.createTask(createTaskDto);

    try {
      await this.tasksRepository.save(task);
      return task;
    } catch (error) {
      throw new InternalServerErrorException('Task could not be saved... :(');
    }
  }

  public async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (!result) {
      throw new InternalServerErrorException('Task could not be deleted... :(');
    }

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id '${id}' not found`);
    }
  }

  public async updateTask(id: string, status: TaskStatusEnum): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;

    try {
      await this.tasksRepository.save(task);
      return task;
    } catch (error) {
      throw new InternalServerErrorException('Task could not be updated... :(');
    }
  }
}
