import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../interfaces/task-status.interface';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  public status?: TaskStatusEnum;

  @IsOptional()
  @IsString()
  public search?: string;
}
