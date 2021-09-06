import { Injectable } from '@nestjs/common';
import { Task } from 'src/task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { title: 'Drink Coffee' },
    { title: 'Learn Nest.js' },
  ];

  public getTasks(): Task[] {
    return this.tasks;
  }
}
