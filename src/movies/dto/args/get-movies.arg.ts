import { ArgsType, Field } from '@nestjs/graphql';
@ArgsType()
export class GetMoviesArgs {
  @Field({ defaultValue: 'DESC' })
  order: 'ASC' | 'DESC';

  @Field({ defaultValue: '' })
  search: string;

  @Field({ defaultValue: 1 })
  page: number;

  @Field({ defaultValue: 10 })
  limit: number;
}
