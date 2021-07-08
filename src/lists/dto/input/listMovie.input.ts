import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListMovieInput {
  @Field()
  listId: number;

  @Field()
  movieId: number;
}
