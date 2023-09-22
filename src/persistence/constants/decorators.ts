import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';

import { MetadataKey } from './enums';

export const Public = () => SetMetadata(MetadataKey.PUBLIC, true);

export const SignedUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user;
});
