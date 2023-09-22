import * as bcrypt from 'bcrypt';

import { BcryptConfig } from '@app/persistence/configs';
import { ConfigPrefix } from '@app/persistence/constants';

export const hasingPassword = (password: string) => {
  return bcrypt.hashSync(password, new BcryptConfig(ConfigPrefix.BCRYPT).getSaltOrRounds());
};

export const comparePassword = (hashedPassword: string, plainPassword: string) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
