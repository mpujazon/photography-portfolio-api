import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { mapAlbumToPublicResponse } from './mappers/public-album.mapper';
import { PublicAlbumResponseDto } from './dto/album-response.dto';

@Injectable()
export class AlbumsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findPublishedAlbums(): Promise<PublicAlbumResponseDto[]> {
    const albums = await this.prismaService.album.findMany({
      where: { isPublished: true },
      include: { coverPhoto: true },
      orderBy: { orderIndex: 'asc' },
    });
    return albums.map(mapAlbumToPublicResponse);
  }

  async findPublishedAlbumBySlug(slug: string) {
    const album = await this.prismaService.album.findUnique({
      where: { slug, isPublished: true },
      include: {
        photos: {
          where: { isPublished: true },
          orderBy: { orderIndex: 'asc' },
        },
      },
    });
    if (!album) throw new NotFoundException(`Album ${slug} not found.`);
    return album;
  }

  findAllAdmin() {
    return this.prismaService.album.findMany({
      include: { coverPhoto: true },
      orderBy: { orderIndex: 'asc' },
    });
  }

  create(data: { title: string; slug: string; description?: string }) {
    return this.prismaService.album.create({ data });
  }

  async update(id: string, data: Record<string, unknown>) {
    await this.ensureExists(id);
    return this.prismaService.album.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    return this.prismaService.album.delete({ where: { id } });
  }

  async reorder(items: { id: string; orderIndex: number }[]) {
    await this.prismaService.$transaction(
      items.map(({ id, orderIndex }) =>
        this.prismaService.album.update({ where: { id }, data: { orderIndex } }),
      ),
    );
  }

  private async ensureExists(id: string) {
    const album = await this.prismaService.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }
}
