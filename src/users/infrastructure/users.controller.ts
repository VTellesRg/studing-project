import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from '../users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

constructor(private readonly userService: UsersService) {}
  @Post()
  async Create(@Body() data: CreateUserDto) {
  await this.userService.checkNewUser(data.user_email, data.user_nickname );
            
    return this.userService.create(data);
  }
  @Get()
  async list() {
    return this.userService.list();
  }
  @Get(':id')
  async show(@Param('id', ParseIntPipe) id) {
    return this.userService.show(id);
  }
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id, @Body() user: UpdateUserDto) {
    await this.userService.checkUser(id);
    await this.userService.checkUpdatePassword(id, user.user_password);
    return this.userService.update(id, user);
  }
  @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id) {
        await this.userService.checkUser(id);
        return this.userService.delete(id);
    }
}
