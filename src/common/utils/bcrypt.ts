import * as bcrypt from 'bcrypt';

import { BcryptConfig } from '@submodule/persistence/configs';

export const hasingPassword = (password: string) => {
  return bcrypt.hashSync(password, new BcryptConfig().getSaltOrRounds());
};

export const comparePassword = (hashedPassword: string, plainPassword: string) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
