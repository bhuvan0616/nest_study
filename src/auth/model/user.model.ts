import { prop } from '@typegoose/typegoose';

export class User {

  // tslint:disable-next-line:variable-name
  _id: string;

  @prop({ required: true })
  username: string;

  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop()
  token: string;
}
