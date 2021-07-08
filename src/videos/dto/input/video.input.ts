import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class VideoInput {
  @Field({ nullable: true })
  id: number;

  @Field()
  size: string;

  @Field()
  type: string;

  @Field()
  url: string;

  @Field(() => Int)
  movieId: number;
}
