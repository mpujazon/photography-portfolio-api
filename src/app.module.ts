import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { PrismaService } from './prisma-service/prisma.service';
import { AlbumsModule } from './albums/albums.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PhotosModule } from './photos/photos.module';
import { SiteConfigModule } from './site-config/site-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AlbumsModule,
    AuthModule,
    CloudinaryModule,
    PhotosModule,
    SiteConfigModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
