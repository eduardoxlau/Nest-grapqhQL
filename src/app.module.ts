import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/user.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
