import { ConfigService } from '@nestjs/config';

export const jwtConstants = {
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.get<string>('tokenAuth'),
    signOptions: { expiresIn: '1d' },
  }),
};
