import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './model/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      token: '',
    });
    return user.save();
  }
}
