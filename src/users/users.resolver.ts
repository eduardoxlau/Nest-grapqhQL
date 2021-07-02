import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './users.entity';
import { Token } from './dto/types/token';
import { UsersService } from './users.service';
import { ResponseStatus } from '../utils/types/response';
import { AuthService } from '../auth/auth.service';
import { LoginInput } from './dto/input/login.input';
import { CurrentUser } from './../auth/auth.decorator';
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
  getUser(@CurrentUser() user: User): Promise<User> {
    return this._usersService.getUser(user.email);
  }

  @Mutation(() => User)
  createUser(
    @Args('input')
    input: CreateUserInput,
  ): Promise<User> {
    return this._usersService.createUser(input);
  }

  @Mutation(() => ResponseStatus)
  async updateUser(
    @Args('input')
    input: UpdateUserInput,
    @CurrentUser() user: User,
  ): Promise<ResponseStatus> {
    console.log(user);
    await this._usersService.updateUser(input, user);
    return { status: 'success' };
  }
}
