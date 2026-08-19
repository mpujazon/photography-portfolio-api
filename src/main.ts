import { NestFactory } from '@nestjs/core';
import dns from 'node:dns';
import { AppModule } from './app.module';

async function bootstrap() {
  dns.setDefaultResultOrder('ipv4first');
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'https://lensbymike.studio', 'https://www.lensbymike.studio'],
    methods: ['GET', 'POST'],
  });


  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
