import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { MovieRepository } from './movies.repository';
@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository])],
  providers: [MoviesResolver, MoviesService],
})
export class MoviesModule {}
