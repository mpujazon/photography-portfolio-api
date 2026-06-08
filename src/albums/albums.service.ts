import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prismaService: PrismaService) {}
  async findPublishedAlbums() {
    return this.prismaService.album.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        orderIndex: 'asc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        layoutType: true,
        coverPhotoId: true,
      },
    });
  }
}
