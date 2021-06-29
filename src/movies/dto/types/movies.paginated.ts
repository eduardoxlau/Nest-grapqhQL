import { ObjectType } from '@nestjs/graphql';

import { Paginated } from './paginated';
import { Movie } from 'src/movies/movies.entity';

@ObjectType()
export class PaginatedMovies extends Paginated(Movie) {}
