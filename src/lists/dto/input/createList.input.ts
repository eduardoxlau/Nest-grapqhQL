import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateListInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true, defaultValue: true })
  public: boolean;
}
