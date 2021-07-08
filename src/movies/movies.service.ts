import { Raw } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Movie } from './movies.entity';
import { MovieInput } from './dto/input/movie.input';
import { MovieRepository } from './movies.repository';
import { GetMovieArgs } from './dto/args/get-movie.arg';
import { GetMoviesArgs } from './dto/args/get-movies.arg';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private readonly _MovieRepository: MovieRepository,
  ) {}

  async paginate(
    options: GetMoviesArgs & IPaginationOptions,
  ): Promise<Pagination<Movie>> {
    return paginate<Movie>(this._MovieRepository, options, {
      order: {
        title: options.order,
      },
      where: {
        title: Raw(
          (alias) => `LOWER(${alias}) Like '%${options.search.toLowerCase()}%'`,
        ),
      },
    });
  }

  async getMovies(): Promise<Movie[]> {
    return this._MovieRepository.find();
  }

  async getMovie(input: GetMovieArgs): Promise<Movie> {
    const { id } = input;
    return await this._MovieRepository.findOne(id);
  }

  async createMovie(input: MovieInput): Promise<Movie> {
    return await this._MovieRepository.save(input);
  }
  async updateMovie(input: MovieInput): Promise<Movie> {
    const { id, ...data } = input;
    await this._MovieRepository.update(id, data);
    return this.getMovie(input);
  }

  async deleteMovie(id: string): Promise<void> {
    await this._MovieRepository.delete(id);
  }
}
