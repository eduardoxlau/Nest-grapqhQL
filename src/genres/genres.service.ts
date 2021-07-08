import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Genre } from './genres.entity';
import { GenreInput } from './dto/input/genre.input';
import { GenreRepository } from './genres.repository';
import { GetGenreArgs } from './dto/args/get-genre.arg';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenreRepository)
    private readonly _GenreRepository: GenreRepository,
  ) {}

  async getGenres(): Promise<Genre[]> {
    return this._GenreRepository.find();
  }

  async getGenre(input: GetGenreArgs): Promise<Genre> {
    const { id } = input;
    return await this._GenreRepository.findOne(id);
  }

  async createGenre(input: GenreInput): Promise<Genre> {
    const genre = await this._GenreRepository.create(input);
    return await this._GenreRepository.save(genre);
  }

  async deleteGenre(id: string): Promise<void> {
    await this._GenreRepository.delete(id);
  }
}
