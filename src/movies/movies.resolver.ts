import { Pagination } from 'nestjs-typeorm-paginate';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Movie } from './movies.entity';
import { MoviesService } from './movies.service';
import { MovieInput } from './dto/input/movie.input';
import { GetMovieArgs } from './dto/args/get-movie.arg';
import { GetMoviesArgs } from './dto/args/get-movies.arg';
import { PaginatedMovies } from './dto/types/movies.paginated';
@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly _MoviesService: MoviesService) {}

  @Query(() => PaginatedMovies)
  getMovies(@Args() filters: GetMoviesArgs): Promise<Pagination<Movie>> {
    return this._MoviesService.paginate(filters);
  }

  @Query(() => Movie, { nullable: true })
  getMovie(@Args() filters: GetMovieArgs): Promise<Movie> {
    return this._MoviesService.getMovie(filters);
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
