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

  public getTaskId(id: string): Task {
    return this.tasks.find((task) => task.id === id);
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

  public deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  public updateTaskState(id: string, status: TaskStatusEnum) {
    const task = this.getTaskId(id);
    task.status = status;

    return task;
  }
}
