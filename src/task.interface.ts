export enum TaskStatusEnum {
  OPEN = 'open',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatusEnum;
}
