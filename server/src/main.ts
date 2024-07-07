import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "https://live-chat-1ovi8qqtx-imanols-projects.vercel.app",
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();

