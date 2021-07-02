import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseStatus {
  @Field()
  status: 'success' | 'fail';
}
