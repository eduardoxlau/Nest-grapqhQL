import { Factory, Seeder } from 'typeorm-seeding';

import { Movie } from 'src/movies/movies.entity';
import { Video } from 'src/videos/videos.entity';

export default class CreateMovies implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const movies: Movie[] = await factory(Movie)().createMany(10);
    await Promise.all(
      movies.map(
        async (movie) => await factory(Video)({ movie: movie }).createMany(1),
      ),
    );
  }
}
