import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';

import { Genre } from './genres.entity';
import { GenresService } from './genres.service';
import { GenreInput } from './dto/input/genre.input';
import { GetGenreArgs } from './dto/args/get-genre.arg';

@Resolver(() => Genre)
export class GenresResolver {
  constructor(private readonly _GenresService: GenresService) {}

  @Query(() => [Genre])
  getGenres(): Promise<Genre[]> {
    return this._GenresService.getGenres();
  }

  @Query(() => Genre)
  getGenre(@Args() getGenreArgs: GetGenreArgs): Promise<Genre> {
    return this._GenresService.getGenre(getGenreArgs);
  }

  @Mutation(() => Genre)
  createGenre(
    @Args('input')
    input: GenreInput,
  ): Promise<Genre> {
    return this._GenresService.createGenre(input);
  }

  @Mutation(() => Genre, { nullable: true })
  deleteGenre(
    @Args('id')
    id: string,
  ): Promise<void> {
    return this._GenresService.deleteGenre(id);
  }
}
