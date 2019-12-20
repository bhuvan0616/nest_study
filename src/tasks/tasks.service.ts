import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './model/tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../auth/model/user.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly taskModel: ReturnModelType<typeof Task>,
  ) {
  }

  async getAllTasks(user: User): Promise<Array<Task>> {
    return this.taskModel.find({ user: user._id }).lean();
  }

  async createTask(creatTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = new this.taskModel({
      title: creatTaskDto.title,
      description: creatTaskDto.description,
      status: creatTaskDto.taskStatus || TaskStatus.OPEN,
      user: user._id,
    });
    const savedTask = await task.save();
    return this.taskModel.findOne({ _id: savedTask._id }).populate('user', '-password -token').lean();
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    return this.taskModel.findOne({ _id: id, user: user._id }).lean();
  }

  async deleteTaskById(id: string, user: User): Promise<boolean> {
    const response = await this.taskModel.deleteOne({ _id: id, user: user._id }).lean();
    return response.deletedCount !== 0;
  }

  async updateTaskById(id: string, taskStatus: TaskStatus, user: User): Promise<Task> {
    return this.taskModel.findOneAndUpdate(
      {
        _id: id,
        user: user._id,
      },
      { taskStatus },
      { new: true },
    );
  }
}
