import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { VerifyUserDto } from './dto/verify-user.dto';
import { User } from './model/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() verifyUserDto: VerifyUserDto): Promise<User> {
    return this.authService.verifyUser(verifyUserDto);
  }
}
