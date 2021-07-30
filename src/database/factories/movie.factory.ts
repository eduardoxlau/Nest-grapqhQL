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

const trailers = [
  'https://www.youtube.com/embed/4hJnpcPiVz8',
  'https://www.youtube.com/embed/hf_wom7OiW8',
  'https://www.youtube.com/embed/OTdr1Ik8SMc',
  'https://www.youtube.com/embed/A4U2pMRV9_k',
];

const images = [
  {
    card: 'http://localhost:4000/card1.png',
    poster: 'http://localhost:4000/view1.png',
    background: 'http://localhost:4000/avatar.png',
  },
  {
    card: 'http://localhost:4000/card2.png',
    poster: 'http://localhost:4000/view2.png',
    background: 'http://localhost:4000/matrix.png',
  },
  {
    card: 'http://localhost:4000/card3.png',
    poster: 'http://localhost:4000/view3.png',
    background: 'http://localhost:4000/padrino.jpeg',
  },
  {
    card: 'http://localhost:4000/more1.png',
    poster: 'http://localhost:4000/view4.png',
    background: 'http://localhost:4000/avatar.png',
  },
  {
    card: 'http://localhost:4000/more2.png',
    poster: 'http://localhost:4000/view2.png',
    background: 'http://localhost:4000/matrix.png',
  },
  {
    card: 'http://localhost:4000/more4.png',
    poster: 'http://localhost:4000/view3.png',
    background: 'http://localhost:4000/padrino.jpeg',
  },
  {
    card: 'http://localhost:4000/card1.png',
    poster: 'http://localhost:4000/view4.png',
    background: 'http://localhost:4000/avatar.png',
  },
  {
    card: 'http://localhost:4000/card1.png',
    poster: 'http://localhost:4000/view1.png',
    background: 'http://localhost:4000/matrix.png',
  },
  {
    card: 'http://localhost:4000/card2.png',
    poster: 'http://localhost:4000/view3.png',
    background: 'http://localhost:4000/padrino.jpeg',
  },
  {
    card: 'http://localhost:4000/card3.png',
    poster: 'http://localhost:4000/view4.png',
    background: 'http://localhost:4000/avatar.png',
  },
];

define(Movie, (faker: typeof Faker) => {
  const image = faker.helpers.randomize(images);
  const genres: Genre[] = [];
  options.forEach((option) => {
    if (faker.random.boolean()) {
      genres.push(option as Genre);
    }
  });
  const movie = new Movie();
  movie.title = faker.name.title();
  movie.tagline = faker.system.fileType();
  movie.overview = faker.lorem.paragraph();
  movie.release_date = new Date();
  movie.stars = Math.floor(Math.random() * 5) + 1;
  movie.trailer_url = faker.helpers.randomize(trailers);
  movie.card_url = image.card;
  movie.poster_url = image.poster;
  movie.backdrop_url = image.background;
  movie.imdb_id = faker.random.uuid();
  movie.genres = genres;

  return movie;
});
