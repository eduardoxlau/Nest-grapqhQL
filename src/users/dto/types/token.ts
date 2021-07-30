import { Field, ObjectType } from '@nestjs/graphql';

import { User } from 'src/users/users.entity';

@ObjectType()
export class Token {
  @Field()
  access_token: string;

  @Field()
  user: User;
}
