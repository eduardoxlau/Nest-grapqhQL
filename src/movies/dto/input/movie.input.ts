import { Field, InputType } from '@nestjs/graphql';
import { GenreInput } from './../../../genres/dto/input/genre.input';

@InputType()
export class MovieInput {
  @Field({ nullable: true })
  id: number;

  @Field()
  title: string;

  @Field()
  tagline: string;

  @Field()
  overview: string;

  @Field()
  release_date: Date;

  @Field()
  stars: number;

  @Field()
  trailer_url: string;

  @Field()
  card_url: string;

  @Field()
  poster_url: string;

  @Field()
  backdrop_url: string;

  @Field()
  imdb_id: string;

  @Field(() => [GenreInput], { nullable: true })
  genres: GenreInput[];
}
