import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: add frontend URL
    credentials: true
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1')
  await app.listen(9000);
}
bootstrap();
