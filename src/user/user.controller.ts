import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'generated/prisma';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':uuid')
  async getUserByUUID(@Param() params: GetUserDto): Promise<User> {
    return this.userService.getUserByUUID(params.uuid);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }
}
