/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}
    async create(data: CreateUserDto) {
        return this.prisma.user.create({
            data,
        });
      
    }
    
    async list() {
        return this.prisma.user.findMany();
    }
    async show (id: number) {
        return this.prisma.user.findUnique({
            where: { user_ID: id },
        });
    }
    async update(id: number, data: UpdateUserDto) {
        return this.prisma.user.update({
            where: { user_ID: id },
            data,
        });
    }
    async delete(id: number) {
        return this.prisma.user.delete({
            where: { user_ID: id },
        });
    }
    async checkUser(id: number){
        if(!this.prisma.user.findUnique({where: {user_ID: id}})){
            throw new NotFoundException('User not found');
            }
    }
  
    async checkNewUser(nickname:string, email: string){
        if(await this.prisma.user.findMany({where: {user_email: email} || {user_nickname: nickname}})){
            throw new ConflictException('User already exists');
        }
       
    }
  
    async checkEmailAndPassword(id: number, email: string, password: string){
        const user = await this.prisma.user.findUnique({where: {user_ID: id}});
         if((user.user_email !== email) || (user.user_password !== password)){
              throw new UnauthorizedException('Email or password is incorrect');
         }
    }
    async checkUpdatePassword(id: number, password: string){
        if((await this.prisma.user.findUnique({ where: { user_ID: id } })).user_password === password){
            throw new ConflictException('Password cant be the same');
        }
    }
}
