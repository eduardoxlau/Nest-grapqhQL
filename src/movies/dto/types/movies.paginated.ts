import { ObjectType } from '@nestjs/graphql';

import { Paginated } from './paginated';
import { Movie } from './../../..//movies/movies.entity';

@ObjectType()
export class PaginatedMovies extends Paginated(Movie) {}
