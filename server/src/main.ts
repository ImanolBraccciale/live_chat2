import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST'], // Add the appropriate HTTP methods used by your client
    allowedHeaders: ['Authorization', 'Content-Type'], // Add headers used by your client
  });

  await app.listen(4000);
}
bootstrap();

