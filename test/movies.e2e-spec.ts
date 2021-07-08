import * as request from 'supertest';
import { GraphQLModule } from '@nestjs/graphql';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { data, query } from './mocks/movies.mock';
import { Movie } from './../src/movies/movies.entity';
import { MoviesService } from './../src/movies/movies.service';
import { MoviesResolver } from './../src/movies/movies.resolver';
import { MovieRepository } from './../src/movies/movies.repository';

describe('Movies (e2e)', () => {
  const moviesService = {
    paginate: () => data,
  };

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot({
          autoSchemaFile: true,
        }),
      ],
      providers: [
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
      .send({
        query,
      })
      .expect(200)
      .expect({ data: { getMovies: moviesService.paginate() } })
      .end(done);
  });
});
