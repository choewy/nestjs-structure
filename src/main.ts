import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

import { ServerConfig } from '@submodule/persistence/configs';

import { IoRedisIoAdapter } from './persistence/adapters';
import { JwtAuthGuard } from './persistence/guards';
import { ConfigPrefix } from './persistence/constants';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(await new IoRedisIoAdapter(app).connect());
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

  app.enableCors();

  const { port, host } = new ServerConfig(ConfigPrefix.SERVER).getOptions();

  await app.listen(port, host);
}

bootstrap();
