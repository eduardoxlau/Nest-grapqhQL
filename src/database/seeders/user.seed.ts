import { Factory, Seeder } from 'typeorm-seeding';

import { User } from 'src/users/users.entity';

export default class CreateUser implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(User)().create();
    await factory(User)().create({ email: 'admin@gmail.com', admin: true });
  }
}
