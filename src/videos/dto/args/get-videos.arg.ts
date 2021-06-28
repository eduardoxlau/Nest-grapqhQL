import { IsNotEmpty } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetVideoArgs {
  @Field()
  @IsNotEmpty()
  id: number;
}
