import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './users.entity';
import { Movie } from './../movies/movies.entity';
import { UserRepository } from './users.repository';
import { generateHash } from './../utils/encryption';
import { CreateUserInput } from './dto/input/createUser.input';
import { UpdateUserInput } from './dto/input/updateUser.input';
import { MoviesService } from './../movies/movies.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _moviesService: MoviesService,
  ) {}

  async getUsers(): Promise<User[]> {
    return this._userRepository.find();
  }

  async getUser(email: string): Promise<User> {
    const user = await this._userRepository.findOne({ email });
    if (user) return user;
    throw new NotFoundException('User not exist');
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const { hash, salt } = generateHash(input.password);
    const user = new User();

    user.email = input.email;
    user.full_name = input.full_name;
    user.photo_path = input.photo_path;
    user.password_hash = hash;
    user.password_salt = salt;

    return await this._userRepository.save(user);
  }
  async updateUser(input: UpdateUserInput, currentUser: User): Promise<void> {
    const user = await this.getUser(currentUser.email);

    user.full_name = input.full_name;
    user.photo_path = input.photo_path;
    await this._userRepository.save(user);
  }

  async deleteUser(currentUser: User): Promise<void> {
    const user = await this.getUser(currentUser.email);
    await this._userRepository.delete(user.id);
  }

  async seenMovie(movieId: number, currentUser: User): Promise<void> {
    const user = await this.getUser(currentUser.email);
    const movie = await this._moviesService.getMovie({ id: movieId });
    const myMovies = (await user.movies) || [];

    user.movies = [...myMovies, movie];

    await this._userRepository.save(user);
  }
  async getMoviesSeen(currentUser: User): Promise<Movie[]> {
    const user = await this.getUser(currentUser.email);
    return (await user.movies) || [];
  }
}
