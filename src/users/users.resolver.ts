import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './users.entity';
import { Token } from './dto/types/token';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { LoginInput } from './dto/input/login.input';
import { CurrentUser } from './../auth/auth.decorator';
import { ResponseStatus } from '../utils/types/response';
import { CreateUserInput } from './dto/input/createUser.input';
import { UpdateUserInput } from './dto/input/updateUser.input';
import { GqlAuthGuard } from './../auth/guards/gpl-auth.guard';

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

  @Mutation(() => User)
  createUser(
    @Args('input')
    input: CreateUserInput,
  ): Promise<User> {
    return this._usersService.createUser(input);
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  getUsers(): Promise<User[]> {
    return this._usersService.getUsers();
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  getUser(@CurrentUser() user: User): Promise<User> {
    return this._usersService.getUser(user.email);
  }

  @Mutation(() => ResponseStatus)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args('input')
    input: UpdateUserInput,
    @CurrentUser() user: User,
  ): Promise<ResponseStatus> {
    await this._usersService.updateUser(input, user);
    return { status: 'success' };
  }
}
