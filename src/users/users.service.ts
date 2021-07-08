import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './users.entity';
import { UserRepository } from './users.repository';
import { generateHash } from './../utils/encryption';
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

  async getUser(email: string): Promise<User> {
    const user = await this._userRepository.findOne({ email });
    if (user) return user;
    throw new NotFoundException('User not exist');
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
  async updateUser(input: UpdateUserInput, currentUser: User): Promise<void> {
    const user = await this.getUser(currentUser.email);

    user.full_name = input.full_name;
    user.photo_path = input.photo_path;
    await this._userRepository.save(user);
  }
}
