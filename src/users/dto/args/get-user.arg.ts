import { IsNotEmpty } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetUserArgs {
  @Field()
  @IsNotEmpty()
  email: string;
}
