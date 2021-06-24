import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  full_name: string;

  @Field()
  @IsOptional()
  photo_path?: string;

  @Field()
  @IsOptional()
  password_salt?: string;

  @Field()
  @IsOptional()
  password_hash?: string;
}
