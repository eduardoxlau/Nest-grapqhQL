import * as bcrypt from 'bcrypt';

const generateHash = (password: string): { hash: string; salt: string } => {
  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return { hash, salt };
};

const compare = ({ password, hash }: { password: string; hash: string }) =>
  bcrypt.compareSync(password, hash);

export { generateHash, compare };
