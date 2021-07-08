import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  full_name: string;

  @Field()
  photo_path: string;

  @Field()
  password: string;
}
