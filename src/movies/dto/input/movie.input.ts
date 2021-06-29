import { Field, InputType } from '@nestjs/graphql';
import { GenreInput } from 'src/genres/dto/input/genre.input';

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
  poster_url: string;

  @Field()
  backdrop_url: string;

  @Field()
  imdb_id: string;

  @Field(() => [GenreInput], { nullable: true })
  genres: GenreInput[];
}
