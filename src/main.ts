import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

import { JwtAuthGuard } from './persistence/guards';

import { AppModule } from './app.module';
import { ServerConfig } from './persistence/configs';

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

  const { port } = new ServerConfig().getOptions();

  await app.listen(port);
}

bootstrap();
