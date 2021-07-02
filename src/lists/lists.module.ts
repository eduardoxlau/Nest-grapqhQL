import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';
import { ListRepository } from './lists.repository';
import { MoviesModule } from './../movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListRepository]), MoviesModule],
  providers: [ListsService, ListsResolver],
})
export class ListsModule {}
