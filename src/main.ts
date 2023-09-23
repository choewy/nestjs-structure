import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

import { ServerConfig } from '@submodule/persistence/configs';

import { JwtAuthGuard } from './persistence/guards';
import { AppModule } from './app.module';
import { ConfigPrefix } from './persistence/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(app.get(JwtAuthGuard), app.get(ThrottlerGuard));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const { port } = new ServerConfig(ConfigPrefix.SERVER).getOptions();

  await app.listen(port);
}

bootstrap();
