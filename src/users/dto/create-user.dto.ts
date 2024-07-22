/* eslint-disable prettier/prettier */
import { IsEmail, IsStrongPassword, IsString,  } from 'class-validator';

export class CreateUserDto {
  @IsString()
  user_name: string;
  user_nickname: string;
  @IsEmail()
  
  user_email: string;
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 0,
    minLowercase: 0,
    minNumbers: 0,
    minUppercase: 0,
  })
  user_password: string;
}
