import { TaskStatusEnum } from '../../task.interface';

export class GetTasksFilterDto {
  status?: TaskStatusEnum;
  search?: string;
}
