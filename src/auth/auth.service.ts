import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './model/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { VerifyUserDto } from './dto/verify-user.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
              private readonly jwtService: JwtService) {
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    const foundUser = await this.userModel.findOne({ username });
    if (foundUser !== null) {
      throw new BadRequestException('User already exists');
    }
    const token = await this.jwtService.sign({
      username,
      email,
    });
    const saltedPassword = await hash(password, 12);
    const user = new this.userModel({
      username,
      email,
      password: saltedPassword,
      token,
    });
    const savedUser = (await user.save()).toObject();
    delete savedUser.password;
    return savedUser;
  }

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<User> {
    const { username, password } = verifyUserDto;
    const foundUser = await this.userModel.findOne({ username });
    if (foundUser === null) {
      throw new BadRequestException('Username or Password mismatch');
    }
    const isPasswordMatching = await compare(password, foundUser.password);
    if (!isPasswordMatching) {
      throw new BadRequestException('Username or Password mismatch');
    }
    const token = await this.jwtService.sign({
      username,
      email: foundUser.email,
    });
    return this.userModel.findOneAndUpdate(
      { username },
      { token },
      {
        new: true,
        projection: '-password',
      },
    );
  }
}
