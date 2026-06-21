import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PrismaService } from '../prisma-service/prisma.service';
import { PhotosController } from './photos.controller';

@Module({
    providers: [PhotosService, PrismaService],
    controllers: [PhotosController]
})
export class PhotosModule {}
