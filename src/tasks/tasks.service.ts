import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskI, TaskStatus, ErrorI } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filtered.dto';

@Injectable()
export class TasksService {
  private tasks: TaskI[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilters(taskFilterDto: GetTasksFilter): TaskI[] {
    const { status, search } = taskFilterDto;
    const filtered = this.tasks.filter((task) => {
      return (
        task.status === status ||
        task.title.toLowerCase().includes(search?.toLowerCase()) ||
        task.description.toLowerCase().includes(search?.toLowerCase())
      );
    });
    return filtered;
  }

  getTaskById(id: string, errorMsg: null | string = null): TaskI | ErrorI {
    if (!errorMsg) {
      errorMsg = 'Unable to get Task. Task Id does not exist.';
    }
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(errorMsg);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskI> {
    const { title, description } = createTaskDto;
    const task: TaskI = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
  ): Promise<TaskI | ErrorI> {
    const errorMsg = 'Unable to update Task. Task Id does not exist.';
    const task = this.getTaskById(id, errorMsg);
    if (task.status === 404) {
      return task;
    }

    task.status = status;
    return task;
  }

  deleteTask(id: string): TaskI | ErrorI {
    const deletedTasks = this.tasks.splice(
      this.tasks.findIndex((task) => task.id === id),
      1,
    )[0];
    if (!deletedTasks) {
      throw new NotFoundException(
        'Unable to delete Task. Task Id does not exist',
      );
    }
    return deletedTasks;
  }
}
