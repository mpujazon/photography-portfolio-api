import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { PublicPhotoResponseDto } from './dto/public-photo-response.dto';
import { mapPhotoToPublicResponse } from './mappers/public-photo.mapper';

@Injectable()
export class PhotosService {
    constructor(private readonly prismaService: PrismaService){}

    async findFeaturedPhotos(): Promise<PublicPhotoResponseDto[]> {
        const photos = await this.prismaService.photo.findMany({
            where: {
                isFeatured: true,
            },
            orderBy: {
                id: 'asc',
            },
        });

        return photos.map(mapPhotoToPublicResponse);
    }
}
