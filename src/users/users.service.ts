import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { GetUserArgs } from './dto/args/get-user.arg';
import { UserInput } from './dto/input/user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return this._userRepository.find();
  }

  async getUser(input: GetUserArgs): Promise<User> {
    const { email } = input;
    const user = await this._userRepository.findOne({ email: email });
    if (user) return user;
    throw new UnauthorizedException();
  }

  async createUser(input: UserInput): Promise<User> {
    return await this._userRepository.save(input);
  }
  async updateUser(input: UserInput): Promise<User> {
    const { id, ...data } = input;
    await this._userRepository.update(id, data);
    return this.getUser(input);
  }

  async deleteUser(id: string): Promise<void> {
    await this._userRepository.delete(id);
  }
}
