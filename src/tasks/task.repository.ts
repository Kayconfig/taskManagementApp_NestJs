import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

@Repository(Task)
export class TaskRepository extends Repository<Task> {}
