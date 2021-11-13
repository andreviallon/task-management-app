import { User } from 'src/auth/user.entity';
import { TaskStatusEnum } from 'src/tasks/interfaces/task-status.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatusEnum;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  user: User;
}
