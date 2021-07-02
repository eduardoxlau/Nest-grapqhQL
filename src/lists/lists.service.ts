import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { List } from './lists.entity';
import { User } from './../users/users.entity';
import { Movie } from './../movies/movies.entity';
import { ListRepository } from './lists.repository';
import { GetListArgs } from './dto/args/get-list.arg';
import { MoviesService } from './../movies/movies.service';
import { CreateListInput } from './dto/input/createList.input';
import { UpdateListInput } from './dto/input/updateList.input';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(ListRepository)
    private readonly _ListRepository: ListRepository,
    private readonly _moviesService: MoviesService,
  ) {}

  async getLists(user: User): Promise<List[]> {
    return this._ListRepository.find({ userId: user.id });
  }

  async getList(input: GetListArgs, user: User): Promise<List> {
    const { id } = input;
    const list = await this._ListRepository.findOne({ id, userId: user.id });
    if (this.isOwnerList(list, user)) return list;
  }

  async createList(input: CreateListInput, user: User): Promise<List> {
    const listInput = new List();

    listInput.name = input.name;
    listInput.description = input.description;
    listInput.public = input.public;
    listInput.userId = user.id;

    return await this._ListRepository.save(listInput);
  }

  async updateList(input: UpdateListInput, user: User): Promise<void> {
    const { id, ...data } = input;
    const list = await this.getList({ id }, user);
    await this._ListRepository.update(list.id, data);
  }

  async deleteList(id: number, user: User): Promise<void> {
    const list = await this.getList({ id }, user);
    await this._ListRepository.delete(list.id);
  }

  async addMovie(listId: number, movieId: number, user: User): Promise<void> {
    const list = await this.getList({ id: listId }, user);
    const movie = await this._moviesService.getMovie({ id: movieId });
    const myMovies = await list.movies;

    list.movies = [...myMovies, movie];

    await this._ListRepository.save(list);
  }
  async removeMovie(
    listId: number,
    movieId: number,
    user: User,
  ): Promise<void> {
    const list = await this.getList({ id: listId }, user);
    const myMovies = await list.movies;

    list.movies = myMovies.filter((movie: Movie) => movie.id !== movieId);

    await this._ListRepository.save(list);
  }

  private isOwnerList(list: List, user: User): boolean {
    if (list.userId === user.id) return true;
    throw new UnauthorizedException();
  }
}
