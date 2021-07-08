import { IsNotEmpty } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetGenreArgs {
  @Field()
  @IsNotEmpty()
  id: number;
}
