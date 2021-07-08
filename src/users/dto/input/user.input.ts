import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  id: string;

  @Field()
  email: string;

  @Field()
  full_name: string;

  @Field()
  photo_path: string;

  @Field()
  password_salt: string;

  @Field()
  password_hash: string;
}
