import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(uuid: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: uuid,
      },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User not found!',
      });
    }

    return user;
  }

  async createUser(data: CreateUserDto): Promise<CreateUserResponseDto> {
    const hashed = await bcrypt.hash(data.password, saltOrRounds);
    const user = await this.prisma.user.create({ data: { ...data, password: hashed } });

    const { password: _password, ...safeData } = user;
    return safeData;
  }
}
