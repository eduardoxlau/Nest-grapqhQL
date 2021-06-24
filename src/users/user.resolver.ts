import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './models/user';
import { UsersService } from './user.service';
import { GetUserArgs } from './dto/args/get-user.arg';
import { CreateUserInput } from './dto/input/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly _usersService: UsersService) {}

  @Query(() => [User, { name: 'users' }])
  getUsers(): User[] {
    return this._usersService.getUsers();
  }

  @Query(() => User)
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this._usersService.getUser(getUserArgs);
  }

  @Mutation(() => User)
  createUser(@Args('createUserinput') createUserinput: CreateUserInput): User {
    return this._usersService.createUser(createUserinput);
  }
}
