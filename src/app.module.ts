import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/user.module';
import { MoviesModule } from './movies/movies.module';
import { VideosModule } from './videos/videos.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    TypeOrmModule.forRoot({
      logging: ['query', 'error'],
    }),
    UsersModule,
    MoviesModule,
    VideosModule,
    GenresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
