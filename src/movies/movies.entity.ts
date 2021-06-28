import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  OneToMany,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Video } from 'src/videos/videos.entity';
import { Genre } from 'src/genres/genres.entity';
@ObjectType()
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  tagline: string;

  @Field()
  @Column()
  overview: string;

  @Field()
  @Column()
  release_date: Date;

  @Field()
  @Column()
  poster_url: string;

  @Field()
  @Column()
  backdrop_url: string;

  @Field()
  @Column()
  imdb_id: string;

  @Field(() => [Video], { nullable: true })
  @OneToMany(() => Video, (video) => video.movie, {
    lazy: true,
  })
  videos: Promise<Video[]>;

  @Field(() => [Genre], { nullable: true })
  @ManyToMany(() => Genre, (genre) => genre.movies, {
    lazy: true,
    cascade: true,
  })
  @JoinTable()
  genres?: Promise<Genre[]> | Genre[];
}
