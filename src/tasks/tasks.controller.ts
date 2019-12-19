import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './model/tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskServices: TasksService) {
  }

  @Get()
  getAllTasks(): Promise<Array<Task>> {
    return this.taskServices.getAllTasks();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskServices.createTask(createTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskServices.getTaskById(id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskServices.deleteTaskById(id);
  }

  @Patch(':id')
  updateTaskById(
    @Param('id') id: string,
    @Body('taskStatus', TaskStatusValidationPipe) taskStatus: TaskStatus,
  ): Promise<Task> {
    return this.taskServices.updateTaskById(id, taskStatus);
  }
}
