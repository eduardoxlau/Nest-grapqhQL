import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Movie } from 'src/movies/movies.entity';
import { Genre } from 'src/genres/genres.entity';

const options = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Fun' },
  { id: 3, name: 'Horror' },
  { id: 4, name: 'Family' },
];
define(Movie, (faker: typeof Faker) => {
  const genres: Genre[] = [];
  options.forEach((option) => {
    if (faker.random.boolean()) {
      genres.push(option as Genre);
    }
  });
  const movie = new Movie();
  movie.title = faker.name.title();
  movie.tagline = faker.system.fileType();
  movie.overview = faker.name.title();
  movie.release_date = new Date();
  movie.poster_url = faker.internet.url();
  movie.backdrop_url = faker.internet.url();
  movie.imdb_id = faker.random.uuid();
  movie.genres = genres;

  return movie;
});
