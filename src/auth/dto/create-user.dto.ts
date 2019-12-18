import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Min(6)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Min(6)
  password: string;
}
