import { NestFactory } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { JwtAuthGuard } from './persistence/guards';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(app.get(JwtAuthGuard), app.get(ThrottlerGuard));

  await app.listen(3000);
}
bootstrap();
