import { prop, Ref } from '@typegoose/typegoose';
import { User } from '../../auth/model/user.model';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true, enum: TaskStatus })
  status: TaskStatus;

  @prop({ required: true, ref: User })
  user: Ref<User>;
}
