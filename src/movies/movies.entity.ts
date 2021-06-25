import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id: string;

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
}
