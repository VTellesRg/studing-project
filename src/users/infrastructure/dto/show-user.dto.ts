/* eslint-disable prettier/prettier */
import { Expose } from 'class-transformer';

export class ShowUserDto {
  @Expose()
  user_name: string;

  @Expose()
  user_nickname: string;
}
