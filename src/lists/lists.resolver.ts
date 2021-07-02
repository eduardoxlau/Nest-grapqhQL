import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { List } from './lists.entity';
import { ListsService } from './lists.service';
import { User } from './../users/users.entity';
import { GetListArgs } from './dto/args/get-list.arg';
import { CurrentUser } from './../auth/auth.decorator';
import { ResponseStatus } from './../utils/types/response';
import { CreateListInput } from './dto/input/createList.input';
import { UpdateListInput } from './dto/input/updateList.input';
import { ListMovieInput } from './dto/input/listMovie.input';

@Resolver(() => List)
export class ListsResolver {
  constructor(private readonly _listsService: ListsService) {}

  @Query(() => [List])
  getLists(@CurrentUser() user: User): Promise<List[]> {
    return this._listsService.getLists(user);
  }

  @Query(() => List)
  getList(
    @Args() getListArgs: GetListArgs,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this._listsService.getList(getListArgs, user);
  }

  @Mutation(() => List)
  createList(
    @Args('input')
    input: CreateListInput,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this._listsService.createList(input, user);
  }

  @Mutation(() => ResponseStatus)
  async updateList(
    @Args('input')
    input: UpdateListInput,
    @CurrentUser() user: User,
  ): Promise<ResponseStatus> {
    await this._listsService.updateList(input, user);
    return { status: 'success' };
  }

  @Mutation(() => ResponseStatus)
  async deleteList(
    @Args('id')
    id: number,
    @CurrentUser() user: User,
  ): Promise<ResponseStatus> {
    await this._listsService.deleteList(id, user);
    return { status: 'success' };
  }

  @Mutation(() => ResponseStatus)
  async addMovieToList(
    @Args('input')
    input: ListMovieInput,
    @CurrentUser() user: User,
  ): Promise<ResponseStatus> {
    await this._listsService.addMovie(input.listId, input.movieId, user);
    return { status: 'success' };
  }

  @Mutation(() => ResponseStatus)
  async removeMovieToList(
    @Args('input')
    input: ListMovieInput,
    @CurrentUser() user: User,
  ): Promise<ResponseStatus> {
    await this._listsService.removeMovie(input.listId, input.movieId, user);
    return { status: 'success' };
  }
}
