import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { generateHash } from './../utils/encryption';
import { GetUserArgs } from './dto/args/get-user.arg';
import { CreateUserInput } from './dto/input/createUser.input';
import { UpdateUserInput } from './dto/input/updateUser.input';
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

  async createUser(input: CreateUserInput): Promise<User> {
    const { hash, salt } = generateHash(input.password);
    const user = new User();

    user.email = input.email;
    user.full_name = input.full_name;
    user.photo_path = input.photo_path;
    user.password_hash = hash;
    user.password_salt = salt;

    return await this._userRepository.save(user);
  }
  async updateUser(input: UpdateUserInput): Promise<User> {
    const { id, ...data } = input;
    await this._userRepository.update(id, data);
    return this.getUser(input);
  }

  async deleteUser(id: string): Promise<void> {
    await this._userRepository.delete(id);
  }
}
