import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MovieInput {
  @Field({ nullable: true })
  id: string;

  @Field()
  title: string;

  @Field()
  tagline: string;

  @Field()
  overview: string;

  @Field()
  release_date: Date;

  @Field()
  poster_url: string;

  @Field()
  backdrop_url: string;

  @Field()
  imdb_id: string;
}
