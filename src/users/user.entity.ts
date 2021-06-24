import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Field()
  @Column()
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
}
