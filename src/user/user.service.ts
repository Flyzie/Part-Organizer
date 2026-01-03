import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByUUID(uuid: string): Promise<User> {
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

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'User with this email not found!',
      });
    }

    return user;
  }

  async createUser(data: CreateUserDto): Promise<CreateUserResponseDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const hashed = await bcrypt.hash(data.password, saltOrRounds);
    const user = await this.prisma.user.create({ data: { ...data, password: hashed } });

    const { password: _password, ...safeData } = user;
    return safeData;
  }
}
