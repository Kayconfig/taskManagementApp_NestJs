import { TaskStatus } from '../tasks.model';
import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  status: TaskStatus;
}
