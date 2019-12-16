import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskServices: TasksService) {}

  @Get()
  getAllTasks(): Array<Task> {
    return this.taskServices.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskServices.createTask(createTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskServices.getTaskById(id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Task {
    return this.taskServices.deleteTaskById(id);
  }

  @Patch(':id')
  updateTaskById(@Param('id') id: string): Task {
    return this.taskServices.updateTaskById(id)
  }
}
