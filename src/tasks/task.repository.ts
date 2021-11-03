import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusEnum } from '../task-status.interface';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    return this.create({
      title,
      description,
      status: TaskStatusEnum.OPEN,
    });
  }
}
