import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { User } from 'src/users/users.entity';
import { List } from 'src/lists/lists.entity';
import { Movie } from 'src/movies/movies.entity';

define(
  List,
  (faker: typeof Faker, context: { movies: Movie[]; user: User }) => {
    const list = new List();
    list.name = faker.company.companyName();
    list.description = faker.name.jobDescriptor();
    list.public = faker.random.boolean();
    list.userId = context.user.id;
    list.movies = context.movies;
    return list;
  },
);
