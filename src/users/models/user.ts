import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  full_name?: string;

  @Field()
  photo_path?: string;

  @Field()
  password_salt?: string;

  @Field()
  password_hash?: string;
}
