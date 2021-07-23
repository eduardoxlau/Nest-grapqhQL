import {
  Entity,
  Column,
  BeforeUpdate,
  BeforeInsert,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { List } from './../lists/lists.entity';
import { Movie } from 'src/movies/movies.entity';
@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  full_name: string;

  @Field()
  @Column()
  photo_path: string;

  @Field()
  @Column()
  password_salt: string;

  @Field()
  @Column()
  password_hash: string;

  @Field()
  @Column({ default: false })
  admin: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  lowerCase?(): void {
    this.email = this.email.toLowerCase();
  }

  @Field(() => [List], { nullable: true })
  @OneToMany(() => List, (list) => list.user, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  lists: List[];

  @Field(() => [Movie], { nullable: true })
  @ManyToMany(() => Movie, (movie) => movie.users, {
    lazy: true,
  })
  @JoinTable({
    name: 'movies_seen_by_user',
  })
  movies: Movie[];
}
