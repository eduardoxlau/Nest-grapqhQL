import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import configuration from './config/configuration';
import { MoviesModule } from './movies/movies.module';
import { VideosModule } from './videos/videos.module';
import { GenresModule } from './genres/genres.module';
import { GqlAuthGuard } from './auth/guards/gpl-auth.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
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
    ListsModule,
  ],
  controllers: [],
  exports: [ConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {
  static port: string;

  constructor(private readonly config: ConfigService) {
    AppModule.port = this.config.get<string>('port');
  }
}
