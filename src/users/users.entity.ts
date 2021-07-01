import {
  Entity,
  Column,
  BeforeUpdate,
  BeforeInsert,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

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
}
