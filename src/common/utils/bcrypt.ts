import * as bcrypt from 'bcrypt';

export const hasingPassword = (password: string) => {
  return bcrypt.hashSync(password, Number(process.env.SALT_OR_ROUNDS));
};

export const comparePassword = (hashedPassword: string, plainPassword: string) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
