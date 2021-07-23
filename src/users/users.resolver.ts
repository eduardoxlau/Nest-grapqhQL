import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from './users.entity';
import { Token } from './dto/types/token';
import { UsersService } from './users.service';
import { Movie } from './../movies/movies.entity';
import { AuthService } from '../auth/auth.service';
import { LoginInput } from './dto/input/login.input';
import { ResponseStatus } from '../utils/types/response';
import { RolesGuard } from './../auth/guards/roles.guard';
import { Admin } from '../auth/decorators/admin.decorator';
import { CreateUserInput } from './dto/input/createUser.input';
import { UpdateUserInput } from './dto/input/updateUser.input';
import { GqlAuthGuard } from './../auth/guards/gpl-auth.guard';
import { CurrentUser } from '../auth/decorators/auth.decorator';

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
  @Admin()
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  getUsers(): Promise<User[]> {
    return this._usersService.getUsers();
  }

  @Query(() => [Movie])
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  getMoviesSeen(@CurrentUser() user: User): Promise<Movie[]> {
    return this._usersService.getMoviesSeen(user);
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

  @Mutation(() => ResponseStatus)
  @UseGuards(GqlAuthGuard)
  async deleteUser(@CurrentUser() user: User): Promise<ResponseStatus> {
    await this._usersService.deleteUser(user);
    return { status: 'success' };
  }

  @Mutation(() => ResponseStatus)
  @UseGuards(GqlAuthGuard)
  async seenMovie(
    @Args('movieId')
    movieId: number,
    @CurrentUser() user: User,
  ): Promise<ResponseStatus> {
    await this._usersService.seenMovie(movieId, user);
    return { status: 'success' };
  }
}
