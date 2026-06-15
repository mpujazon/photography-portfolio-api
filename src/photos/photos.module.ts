import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PhotosService } from './photos.service';
import { PublicPhotosController } from './public-photos.controller';
import { AdminPhotosController } from './admin-photos.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaService } from '../prisma-service/prisma.service';

@Module({
  imports: [
    CloudinaryModule,
    MulterModule.register({ storage: memoryStorage() }),
  ],
  providers: [PhotosService, PrismaService],
  controllers: [PublicPhotosController, AdminPhotosController],
})
export class PhotosModule {}
