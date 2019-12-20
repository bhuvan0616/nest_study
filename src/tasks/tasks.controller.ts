import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './model/tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/model/user.model';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskServices: TasksService) {
  }

  @Get()
  getAllTasks(@GetUser() user: User): Promise<Array<Task>> {
    return this.taskServices.getAllTasks(user);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.taskServices.createTask(createTaskDto, user);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskServices.getTaskById(id, user);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string, @GetUser() user: User): Promise<boolean> {
    return this.taskServices.deleteTaskById(id, user);
  }

  @Patch(':id')
  updateTaskById(
    @Param('id') id: string,
    @Body('taskStatus', TaskStatusValidationPipe) taskStatus: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskServices.updateTaskById(id, taskStatus, user);
  }
}
