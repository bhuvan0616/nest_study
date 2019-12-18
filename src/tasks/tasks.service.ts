import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './model/tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly taskModel: ReturnModelType<typeof Task>,
  ) {
  }

  async getAllTasks(): Promise<Array<Task>> {
    return this.taskModel.find().lean();
  }

  async createTask(creatTaskDto: CreateTaskDto): Promise<Task> {
    const task = new this.taskModel({
      title: creatTaskDto.title,
      description: creatTaskDto.description,
      status: creatTaskDto.taskStatus || TaskStatus.OPEN,
    });
    return task.save();
  }

  async getTaskById(id: string): Promise<Task> {
    return this.taskModel.findOne({ _id: id }).lean();
  }

  async deleteTaskById(id: string): Promise<Task> {
    return this.taskModel.deleteOne({ _id: id }).lean();
  }

  async updateTaskById(id: string, taskStatus: TaskStatus): Promise<Task> {
    return this.taskModel.findOneAndUpdate(
      { _id: id },
      { taskStatus },
      { new: true },
    );
  }
}
