import { IsNotEmpty } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetListArgs {
  @Field()
  @IsNotEmpty()
  id: number;
}
