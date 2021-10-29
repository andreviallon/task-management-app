import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatusEnum } from '../../task.interface';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  public status?: TaskStatusEnum;

  @IsOptional()
  @IsString()
  public search?: string;
}
