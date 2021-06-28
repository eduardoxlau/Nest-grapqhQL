import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenresService } from './genres.service';
import { GenresResolver } from './genres.resolver';
import { GenreRepository } from './genres.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GenreRepository])],
  providers: [GenresResolver, GenresService],
})
export class GenresModule {}
