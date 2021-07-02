import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateListInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  public: boolean;
}
