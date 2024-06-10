import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  const nameToSearch = "nombre_que_quieres_buscar";
  console.log("Nombre de búsqueda:", nameToSearch);
  app.enableCors({
    origin: true,
    // CORS HTTP methods
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
  await app.listen(3000);
}
bootstrap();
