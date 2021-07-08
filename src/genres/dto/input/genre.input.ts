import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GenreInput {
  @Field({ nullable: true })
  id: number;

  @Field()
  name: string;
}
