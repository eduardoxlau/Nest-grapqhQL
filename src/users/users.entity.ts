import {
  Entity,
  Column,
  BeforeUpdate,
  BeforeInsert,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { List } from './../lists/lists.entity';
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

  @BeforeInsert()
  @BeforeUpdate()
  lowerCase?(): void {
    this.email = this.email.toLowerCase();
  }

  @Field(() => [List], { nullable: true })
  @OneToMany(() => List, (list) => list.user, {
    lazy: true,
  })
  lists: List[];
}
