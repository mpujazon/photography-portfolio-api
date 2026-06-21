import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { mapAlbumToPublicResponse } from './mappers/public-album.mapper';
import { PublicAlbumResponseDto } from './dto/album-response.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly prismaService: PrismaService) {}
  async findPublishedAlbums(): Promise<PublicAlbumResponseDto[]> {
    const albums = await this.prismaService.album.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        orderIndex: 'asc',
      },
      include: {
        _count:{
          select:{ photos: true }
        }
      }
    });

    return albums.map(mapAlbumToPublicResponse);
  }
  async findPublishedAlbumBySlug(
    slug: string,
  ): Promise<PublicAlbumResponseDto | null> {
    const album = await this.prismaService.album.findUnique({
      where: {
        slug: slug,
        isPublished: true,
      },
      include: { photos: true }
    });
    return album ? mapAlbumToPublicResponse(album) : null;
  }
   async findPublishedFeaturedAlbum(): Promise<PublicAlbumResponseDto | null> {
    const album = await this.prismaService.album.findFirst({
      where: {
        isPublished: true,
        isFeatured: true
      },
      include: { photos: true }
    });
    return album ? mapAlbumToPublicResponse(album) : null;
  }
}
