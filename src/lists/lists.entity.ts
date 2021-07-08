import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './../users/users.entity';
import { Movie } from './../movies/movies.entity';

@ObjectType()
@Entity()
export class List {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field()
  @Column()
  public: boolean;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.lists, {
    lazy: true,
  })
  user: User;

  @Field(() => [Movie], { nullable: true })
  @ManyToMany(() => Movie, (movie) => movie.lists, {
    lazy: true,
  })
  @JoinTable()
  movies: Movie[];
}
