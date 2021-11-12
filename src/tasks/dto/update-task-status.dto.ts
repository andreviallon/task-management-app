import { IsEnum } from 'class-validator';
import { TaskStatusEnum } from 'src/tasks/interfaces/task-status.interface';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatusEnum)
  public status: TaskStatusEnum;
}
