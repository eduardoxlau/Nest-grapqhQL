import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { User } from 'src/users/users.entity';
import { generateHash } from 'src/utils/encryption';

define(User, (faker: typeof Faker) => {
  const { hash, salt } = generateHash('password');

  const user = new User();
  user.email = faker.internet.email();
  user.full_name = faker.internet.userName();
  user.photo_path = 'http://localhost:4000/avatar.png';
  user.password_salt = salt;
  user.password_hash = hash;

  return user;
});
