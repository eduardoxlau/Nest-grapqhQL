import { UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';

import { Genre } from './genres.entity';
import { GenresService } from './genres.service';
import { GenreInput } from './dto/input/genre.input';
import { GetGenreArgs } from './dto/args/get-genre.arg';
import { GqlAuthGuard } from './../auth/guards/gpl-auth.guard';

@Resolver(() => Genre)
export class GenresResolver {
  constructor(private readonly _GenresService: GenresService) {}

  @Query(() => [Genre])
  @UseGuards(GqlAuthGuard)
  getGenres(): Promise<Genre[]> {
    return this._GenresService.getGenres();
  }

  @Query(() => Genre)
  @UseGuards(GqlAuthGuard)
  getGenre(@Args() getGenreArgs: GetGenreArgs): Promise<Genre> {
    return this._GenresService.getGenre(getGenreArgs);
  }

  @Mutation(() => Genre)
  @UseGuards(GqlAuthGuard)
  createGenre(
    @Args('input')
    input: GenreInput,
  ): Promise<Genre> {
    return this._GenresService.createGenre(input);
  }

  @Mutation(() => Genre, { nullable: true })
  @UseGuards(GqlAuthGuard)
  deleteGenre(
    @Args('id')
    id: string,
  ): Promise<void> {
    return this._GenresService.deleteGenre(id);
  }
}
