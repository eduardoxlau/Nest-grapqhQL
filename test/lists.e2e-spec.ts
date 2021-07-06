import * as request from 'supertest';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GqlExecutionContext, GraphQLModule } from '@nestjs/graphql';
import { CanActivate, INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { List } from './../src/lists/lists.entity';
import configuration from './../src/config/configuration';
import { getLists, queryLists } from './mocks/lists.mock';
import { ListsService } from './../src/lists/lists.service';
import { ListsResolver } from './../src/lists/lists.resolver';
import { ListRepository } from './../src/lists/lists.repository';
import { JwtStrategy } from './../src/auth/strategies/jwt.strategy';

describe('lists (e2e)', () => {
  const listsService = {
    getLists: () => [getLists],
  };
  const mockGuard: CanActivate = {
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
          provide: APP_GUARD,
          useValue: mockGuard,
        },
        {
          provide: getRepositoryToken(List),
          useClass: ListRepository,
        },
        ListsResolver,
        ListsService,
      ],
    })
      .overrideProvider(ListsService)
      .useValue(listsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    return await app.close();
  });

  it('shouldn"t get lists when not set tokenAuth', (done) => {
    request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: queryLists,
      })
      .expect(200)
      .expect(({ body: { errors } }) => {
        expect(errors.length).toBeGreaterThan(0);
      })
      .end(done);
  });

  it('should get lists when set tokenAuth', (done) => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set({
        Authorization: 'Bearer xxx',
      })
      .send({
        query: queryLists,
      })
      .expect(200)
      .expect({ data: { getLists: listsService.getLists() } })
      .end(done);
  });
});
