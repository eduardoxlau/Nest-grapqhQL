import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql';

import { data, query } from './mocks/movies.mock';
import { Movie } from './../src/movies/movies.entity';
import configuration from './../src/config/configuration';
import { RolesGuard } from './../src/auth/guards/roles.guard';
import { MoviesService } from './../src/movies/movies.service';
import { MoviesResolver } from './../src/movies/movies.resolver';
import { GqlAuthGuard } from './../src/auth/guards/gpl-auth.guard';
import { MovieRepository } from './../src/movies/movies.repository';
import { JwtStrategy } from './../src/auth/strategies/jwt.strategy';

describe('Movies (e2e)', () => {
  const moviesService = {
    paginate: () => data,
  };

  const mockGuard = {
    canActivate: jest.fn((context) => {
      const ctx = GqlExecutionContext.create(context);
      const { headers } = ctx.getContext().req;
      if (headers.authorization) return true;
      return false;
    }),
  };

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot({
          autoSchemaFile: true,
        }),
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
      ],
      providers: [
        JwtStrategy,
        {
          provide: getRepositoryToken(Movie),
          useClass: MovieRepository,
        },
        MoviesResolver,
        MoviesService,
      ],
    })
      .overrideProvider(MoviesService)
      .useValue(moviesService)
      .overrideGuard(GqlAuthGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterEach(async () => {
    return await app.close();
  });
  it('should return movies with videos and genres', (done) => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set({
        Authorization: 'Bearer xxx',
      })
      .send({
        query,
      })
      .expect(200)
      .expect({ data: { getMovies: moviesService.paginate() } })
      .end(done);
  });
});
