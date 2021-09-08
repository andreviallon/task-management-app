import { Injectable } from '@nestjs/common';
import { Task } from 'src/task.interface';

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
}
