import * as request from 'supertest';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from './../src/users/users.entity';
import { AuthService } from './../src/auth/auth.service';
import configuration from './../src/config/configuration';
import { UsersService } from './../src/users/users.service';
import { UsersResolver } from './../src/users/users.resolver';
import { UserRepository } from './../src/users/users.repository';
import { JwtStrategy } from './../src/auth/strategies/jwt.strategy';
import { loginMock, createUserMock, getUserMock } from './mocks/users.mock';

describe('Users (e2e)', () => {
  const authService = {
    validate: () => loginMock.response,
  };
  const userService = {
    createUser: () => createUserMock.response,
    getUser: () => getUserMock.response,
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
          provide: getRepositoryToken(User),
          useClass: UserRepository,
        },
        {
          provide: AuthService,
          useValue: authService,
        },
        UsersResolver,
        UsersService,
      ],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    return await app.close();
  });

  it('should validate user', (done) => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: loginMock.mutation,
      })
      .expect(200)
      .expect({ data: { login: authService.validate() } })
      .end(done);
  });

  it('should create user', (done) => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createUserMock.mutation,
      })
      .expect(200)
      .expect({ data: { createUser: userService.createUser() } })
      .end(done);
  });

  it('should throw error when token is not set', (done) => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: getUserMock.query,
      })
      .expect(200)
      .expect(({ body: { errors } }) => {
        expect(errors.length).toBeGreaterThan(0);
      })
      .end(done);
  });
});
