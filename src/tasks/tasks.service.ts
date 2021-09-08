import { Injectable } from '@nestjs/common';
import { Task, TaskStatusEnum } from 'src/task.interface';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Drink Coffee',
      description: '',
      status: TaskStatusEnum.DONE,
    },
    {
      id: '2',
      title: 'Learn Nest.js',
      description: '',
      status: TaskStatusEnum.DONE,
    },
  ];

  public getTasks(): Task[] {
    return this.tasks;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      title,
      description,
      id: uuid(),
      status: TaskStatusEnum.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
