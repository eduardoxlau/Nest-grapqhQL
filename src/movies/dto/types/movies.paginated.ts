import { ObjectType } from '@nestjs/graphql';

import { Movie } from './../../..//movies/movies.entity';
import { Paginated } from '../../../utils/types/paginated';

@ObjectType()
export class PaginatedMovies extends Paginated(Movie) {}
