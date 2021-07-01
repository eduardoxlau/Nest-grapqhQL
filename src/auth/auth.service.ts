import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '../users/users.entity';
import { compare } from './../utils/encryption';
import { Token } from 'src/users/dto/types/token';
import { UsersService } from '../users/users.service';
import { LoginInput } from '../users/dto/input/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async validate(data: LoginInput): Promise<Token> {
    const user: User = await this._usersService.getUser({ email: data.email });
    const isPassword = compare({
      password: data.password,
      hash: user.password_hash,
    });

    if (user && isPassword) return this.login(user);

    throw new UnauthorizedException();
  }

  async login(user: User) {
    const payload = { username: user.email, id: user.id };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
