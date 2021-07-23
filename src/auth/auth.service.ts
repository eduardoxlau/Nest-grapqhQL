import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { User } from '../users/users.entity';
import { compare } from './../utils/encryption';
import { Token } from './../users/dto/types/token';
import { UsersService } from '../users/users.service';
import { ForbiddenError } from 'apollo-server-express';
import { LoginInput } from '../users/dto/input/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async validate(data: LoginInput): Promise<Token> {
    const user: User = await this._usersService.getUser(data.email);
    const isPassword = compare({
      password: data.password,
      hash: user.password_hash,
    });

    if (user && isPassword) return this.login(user);

    throw new ForbiddenError('Password is wrong');
  }

  async login(user: User) {
    const payload = { admin: user.admin, id: user.id, email: user.email };
    return {
      access_token: this._jwtService.sign(payload),
      user,
    };
  }
}
