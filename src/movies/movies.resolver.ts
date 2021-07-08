import { Pagination } from 'nestjs-typeorm-paginate';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Movie } from './movies.entity';
import { MoviesService } from './movies.service';
import { MovieInput } from './dto/input/movie.input';
import { GetMovieArgs } from './dto/args/get-movie.arg';
import { GetMoviesArgs } from './dto/args/get-movies.arg';
import { RolesGuard } from './../auth/guards/roles.guard';
import { Admin } from './../auth/decorators/admin.decorator';
import { PaginatedMovies } from './dto/types/movies.paginated';
import { GqlAuthGuard } from './../auth/guards/gpl-auth.guard';
@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly _MoviesService: MoviesService) {}

  @Query(() => PaginatedMovies)
  @Admin()
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  getMovies(@Args() filters: GetMoviesArgs): Promise<Pagination<Movie>> {
    return this._MoviesService.paginate(filters);
  }

  @Query(() => Movie, { nullable: true })
  @Admin()
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  getMovie(@Args() filters: GetMovieArgs): Promise<Movie> {
    return this._MoviesService.getMovie(filters);
  }

  @Mutation(() => Movie)
  @Admin()
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  createMovie(
    @Args('input')
    input: MovieInput,
  ): Promise<Movie> {
    return this._MoviesService.createMovie(input);
  }

  @Mutation(() => Movie)
  @Admin()
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  updateMovie(
    @Args('input')
    input: MovieInput,
  ): Promise<Movie> {
    return this._MoviesService.updateMovie(input);
  }

  @Mutation(() => Movie, { nullable: true })
  @Admin()
  @UseGuards(RolesGuard)
  @UseGuards(GqlAuthGuard)
  deleteMovie(
    @Args('id')
    id: string,
  ): Promise<void> {
    return this._MoviesService.deleteMovie(id);
  }
}
