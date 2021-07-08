import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Movie } from './../movies/movies.entity';

@ObjectType()
@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  size: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  url: string;

  @Field(() => Int)
  @Column()
  movieId: number;

  @ManyToOne(() => Movie, (movie) => movie.videos, {
    lazy: true,
  })
  @Field(() => Movie, { nullable: true })
  movie: Movie;
}
