import * as dotenv from 'dotenv';
dotenv.config();

export const IS_PUBLIC_KEY = 'isPublic';
export const jwtConstants = {
  secret: process.env.TOKEN_AUTH,
};
