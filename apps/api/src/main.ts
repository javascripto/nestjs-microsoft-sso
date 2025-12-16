import { join } from 'node:path';
import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Global prefix
  app.setGlobalPrefix('api', { exclude: ['login'] });
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );
  // SPA static assets
  app.useStaticAssets(join(__dirname, '..', '..', 'web', 'dist'));
  // Enable CORS and disable x-powered-by header
  app.enableCors();
  app.disable('x-powered-by');
  // Start the server
  const configService = app.get(ConfigService);
  await app.listen(configService.getOrThrow<number>('PORT'));
}
bootstrap();
