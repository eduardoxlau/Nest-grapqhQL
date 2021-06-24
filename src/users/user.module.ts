import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './user.service';
import { UsersResolver } from './user.resolver';
import { UserRepository } from './user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
