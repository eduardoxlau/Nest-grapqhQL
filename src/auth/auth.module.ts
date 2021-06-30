import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { forwardRef, Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { jwtConstants } from './auth.constants';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
