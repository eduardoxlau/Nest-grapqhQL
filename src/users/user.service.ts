import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { GetUserArgs } from './dto/args/get-user.arg';
import { CreateUserInput } from './dto/input/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async getUsers(): Promise<User[]> {
    return this._userRepository.find();
  }

  async getUser(getUserArgs: GetUserArgs): Promise<User> {
    const { id } = getUserArgs;
    return await this._userRepository.findOne(id);
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    return await this._userRepository.save(createUserInput);
  }
}
