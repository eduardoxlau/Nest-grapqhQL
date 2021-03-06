import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { List } from './lists.entity';
import { ListsService } from './lists.service';
import { User } from './../users/users.entity';
import { GetListArgs } from './dto/args/get-list.arg';
import { ResponseStatus } from './../utils/types/response';
import { ListMovieInput } from './dto/input/listMovie.input';
import { GqlAuthGuard } from './../auth/guards/gpl-auth.guard';
import { CreateListInput } from './dto/input/createList.input';
import { UpdateListInput } from './dto/input/updateList.input';
import { CurrentUser } from '../auth/decorators/auth.decorator';

@Resolver(() => List)
export class ListsResolver {
  constructor(private readonly _listsService: ListsService) {}

  @Query(() => [List])
  @UseGuards(GqlAuthGuard)
  getLists(@CurrentUser() user: User): Promise<List[]> {
    return this._listsService.getLists(user);
  }

  @Query(() => List)
  @UseGuards(GqlAuthGuard)
  getList(
    @Args() getListArgs: GetListArgs,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this._listsService.getList(getListArgs, user);
  }

  @Mutation(() => List)
  @UseGuards(GqlAuthGuard)
  createList(
    @Args('input')
    input: CreateListInput,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this._listsService.createList(input, user);
  }

  @Mutation(() => ResponseStatus)
  @UseGuards(GqlAuthGuard)
  async updateList(
    @Args('input')
    input: UpdateListInput,
    @CurrentUser() user: User,
  ): Promise<ResponseStatus> {
    await this._listsService.updateList(input, user);
    return { status: 'success' };
  }

  @Mutation(() => ResponseStatus)
  @UseGuards(GqlAuthGuard)
  async deleteList(
    @Args('id')
    id: number,
    @CurrentUser() user: User,
  ): Promise<ResponseStatus> {
    await this._listsService.deleteList(id, user);
    return { status: 'success' };
  }

  @Mutation(() => List)
  @UseGuards(GqlAuthGuard)
  async addMovieToList(
    @Args('input')
    input: ListMovieInput,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this._listsService.addMovie(input.listId, input.movieId, user);
  }

  @Mutation(() => List)
  @UseGuards(GqlAuthGuard)
  async removeMovieToList(
    @Args('input')
    input: ListMovieInput,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this._listsService.removeMovie(input.listId, input.movieId, user);
  }
}
