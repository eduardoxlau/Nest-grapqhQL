import { Factory, Seeder } from 'typeorm-seeding';

import { User } from 'src/users/users.entity';
import { Movie } from 'src/movies/movies.entity';
import { Video } from 'src/videos/videos.entity';
import { List } from 'src/lists/lists.entity';

export default class CreateSeeders implements Seeder {
  public async run(factory: Factory): Promise<any> {
    const movies: Movie[] = await factory(Movie)().createMany(20);
    await Promise.all(
      movies.map(
        async (movie) => await factory(Video)({ movie: movie }).createMany(1),
      ),
    );

    await factory(User)().create();
    const user: User = await factory(User)().create({
      email: 'admin@gmail.com',
      admin: true,
    });
    await factory(List)({ movies: movies.slice(0, 10), user: user }).create();
  }
}
