import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ bearerToken: string }> {
    const user = await this.userService.getUserByEmail(email);

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException({
        message: 'Incorrect Password!',
      });
    }
    const payload = { sub: user.id, username: user.name };
    return {
      bearerToken: await this.jwtService.signAsync(payload),
    };
  }
}
