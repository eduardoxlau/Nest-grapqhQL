import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Movie } from './movies.entity';
import { MoviesService } from './movies.service';
import { GetMovieArgs } from './dto/args/get-movies.arg';
import { MovieInput } from './dto/input/movie.input';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly _MoviesService: MoviesService) {}

  @Query(() => [Movie])
  getMovies(): Promise<Movie[]> {
    return this._MoviesService.getMovies();
  }

  @Query(() => Movie, { nullable: true })
  getMovie(@Args() getMovieArgs: GetMovieArgs): Promise<Movie> {
    return this._MoviesService.getMovie(getMovieArgs);
  }

  @Mutation(() => Movie)
  createMovie(
    @Args('input')
    input: MovieInput,
  ): Promise<Movie> {
    return this._MoviesService.createMovie(input);
  }

  @Mutation(() => Movie)
  updateMovie(
    @Args('input')
    input: MovieInput,
  ): Promise<Movie> {
    return this._MoviesService.updateMovie(input);
  }

  @Mutation(() => Movie, { nullable: true })
  deleteMovie(
    @Args('id')
    id: string,
  ): Promise<void> {
    return this._MoviesService.deleteMovie(id);
  }
}
