import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { TaskStatusEnum } from './interfaces/task-status.interface';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  public getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  public async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ id, user });

    if (!task) {
      throw new NotFoundException(`Task with id '${id}' not found... :(`);
    }

    return task;
  }

  public async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = this.tasksRepository.createTask(createTaskDto, user);

    try {
      await this.tasksRepository.save(task);
      return task;
    } catch (error) {
      throw new InternalServerErrorException('Task could not be saved... :(');
    }
  }

  public async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (!result) {
      throw new InternalServerErrorException('Task could not be deleted... :(');
    }

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id '${id}' not found`);
    }
  }

  public async updateTask(
    id: string,
    status: TaskStatusEnum,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;

    try {
      await this.tasksRepository.save(task);
      return task;
    } catch (error) {
      throw new InternalServerErrorException('Task could not be updated... :(');
    }
  }
}
