import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // add middleware 
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe()) // de validata data, activate class-validator

  await app.listen(3000);
}
bootstrap();
