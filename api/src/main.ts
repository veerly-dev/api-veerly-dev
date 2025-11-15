import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS configuration for all frontends
  app.enableCors({
    origin: [
      'https://veerly.dev',
      'https://veerly.dev/profile',
      'https://veerlyadmin.up.railway.app',
      'https://veerlyapp.up.railway.app',
      'http://localhost:3000',
      /\.veerly\.dev$/,
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 API ready on port: ${port}`);
}

bootstrap();
