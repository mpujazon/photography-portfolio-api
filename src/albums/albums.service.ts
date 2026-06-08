import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { mapAlbumToPublicResponse } from './mappers/public-album.mapper';

@Injectable()
export class AlbumsService {
  constructor(private readonly prismaService: PrismaService) {}
  async findPublishedAlbums() {
    const albums = await this.prismaService.album.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        orderIndex: 'asc',
      },
    });

    return albums.map(mapAlbumToPublicResponse);
  }
}
