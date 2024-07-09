import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // Lanza una excepción si hay propiedades no declaradas en el DTO
  }))

  app.enableCors({
    origin: true,
    // CORS HTTP methods
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
  await app.listen(3000);
}
bootstrap();
