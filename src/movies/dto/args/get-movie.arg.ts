import { IsNotEmpty } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetMovieArgs {
  @Field()
  @IsNotEmpty()
  id: number;
}
