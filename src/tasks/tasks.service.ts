import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  getAllTasks(): Array<Task> {
    return this.tasks;
  }

  createTask(creatTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title: creatTaskDto.title,
      description: creatTaskDto.description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(item => item.id === id);
  }

  deleteTaskById(id: string): Task {
    const itemToDelete = this.tasks.find(task => task.id === id);
    const index = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(index, 1);
    return itemToDelete;
  }

  updateTaskById(id: string): Task {
    const itemToUpdate = this.tasks.find(task => task.id === id);
    itemToUpdate.status = TaskStatus.IN_PROGRESS;
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasks.push(itemToUpdate);
    return itemToUpdate;
  }
}
