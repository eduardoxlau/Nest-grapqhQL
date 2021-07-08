import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthModule } from './../auth/auth.module';
import { UserRepository } from './users.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
