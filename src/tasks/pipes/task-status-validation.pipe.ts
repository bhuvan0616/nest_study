import { TaskStatus } from './../model/tasks.model';
import { PipeTransform, BadRequestException } from '@nestjs/common';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!Object.keys(TaskStatus).includes(value)) {
      throw new BadRequestException(
        `Invalid task status. Task status should be one of [${Object.keys(
          TaskStatus,
        )}]`,
      );
    }
    return value;
  }
}
