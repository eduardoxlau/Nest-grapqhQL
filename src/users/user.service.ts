import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'apollo-server-express';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
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
    const { id } = input;
    const user = await this._userRepository.findOne(id);
    if (user) return user;
    throw new ValidationError(`not found user with this id ${id}`);
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
