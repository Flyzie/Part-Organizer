import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'generated/prisma';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':uuid')
  async getUser(@Param('uuid') uuid: string): Promise<User> {
    return this.userService.getUser(uuid);
  }
}
