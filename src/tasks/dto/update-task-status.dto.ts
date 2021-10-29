import { IsEnum } from 'class-validator';
import { TaskStatusEnum } from 'src/task.interface';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatusEnum)
  public status: TaskStatusEnum;
}
