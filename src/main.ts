import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://localhost:5173',
      process.env.FRONTEND_URL ?? '',
    ].filter(Boolean),
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
