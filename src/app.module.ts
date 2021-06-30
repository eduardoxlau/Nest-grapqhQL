import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { VideosModule } from './videos/videos.module';
import { GenresModule } from './genres/genres.module';
import { GqlAuthGuard } from './auth/guards/gpl-auth.guard';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      context: ({ req }) => ({ req }),
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {}
