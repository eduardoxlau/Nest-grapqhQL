import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './users.entity';
import { Token } from './dto/types/token';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { LoginInput } from './dto/input/login.input';
import { GetUserArgs } from './dto/args/get-user.arg';
import { CreateUserInput } from './dto/input/createUser.input';
import { UpdateUserInput } from './dto/input/updateUser.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly _usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Mutation(() => Token)
  login(
    @Args('input')
    input: LoginInput,
  ) {
    return this.authService.validate(input);
  }

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
    input: CreateUserInput,
  ): Promise<User> {
    return this._usersService.createUser(input);
  }

  @Mutation(() => User)
  updateUser(
    @Args('input')
    input: UpdateUserInput,
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
