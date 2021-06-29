import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Video } from 'src/videos/videos.entity';
import { Movie } from 'src/movies/movies.entity';

define(Video, (faker: typeof Faker, context: { movie: Movie }) => {
  const video = new Video();
  video.size = faker.system.mimeType();
  video.type = faker.system.fileType();
  video.url = faker.internet.url();
  video.movie = context.movie;

  return video;
});
