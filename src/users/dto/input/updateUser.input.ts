import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  full_name: string;

  @Field()
  photo_path: string;
}
