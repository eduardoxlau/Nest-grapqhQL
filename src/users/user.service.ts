import { Injectable } from '@nestjs/common';

import { User } from './models/user';
import { GetUserArgs } from './dto/args/get-user.arg';
import { CreateUserInput } from './dto/input/create-user.input';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      email: 'sanchezpazrafael@gmail.com',
    },
  ];

  public getUsers(): User[] {
    return this.users;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    const { id } = getUserArgs;
    return this.users.find(({ id: userId }) => userId === id);
  }

  public createUser(createUserInput: CreateUserInput): User {
    const user = { ...createUserInput, id: new Date().getTime().toString() };
    this.users.push(user);
    return user;
  }
}
