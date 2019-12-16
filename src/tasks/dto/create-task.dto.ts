import { TaskStatus } from '../model/tasks.model';
import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  taskStatus?: TaskStatus;
}
