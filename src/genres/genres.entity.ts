import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Movie } from 'src/movies/movies.entity';

@ObjectType()
@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Movie], { nullable: true })
  @ManyToMany(() => Movie, (movie) => movie.genres, {
    lazy: true,
  })
  movies: Promise<Movie[]>;
}
