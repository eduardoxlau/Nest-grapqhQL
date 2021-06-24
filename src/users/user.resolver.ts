import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './user.entity';
import { UsersService } from './user.service';
import { GetUserArgs } from './dto/args/get-user.arg';
import { UserInput } from './dto/input/user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly _usersService: UsersService) {}

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this._usersService.getUsers();
  }

  @Query(() => User)
  getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this._usersService.getUser(getUserArgs);
  }

  @Mutation(() => User)
  createUser(
    @Args('input')
    input: UserInput,
  ): Promise<User> {
    return this._usersService.createUser(input);
  }

  @Mutation(() => User)
  updateUser(
    @Args('input')
    input: UserInput,
  ): Promise<User> {
    return this._usersService.updateUser(input);
  }

  @Mutation(() => User, { nullable: true })
  deleteUser(
    @Args('id')
    id: string,
  ): Promise<void> {
    return this._usersService.deleteUser(id);
  }
}
