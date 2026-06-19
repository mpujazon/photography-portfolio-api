import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('public/albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Get()
  findPublishedAlbums() {
    return this.albumsService.findPublishedAlbums();
  }

  @Get('/featured')
  async findPublishedFeaturedAlbum() {
    const album = await this.albumsService.findPublishedFeaturedAlbum();
    if (!album) throw new NotFoundException(`Featured album not found.`);
    return album;
  }
  
  @Get(':slug')
  async findPublishedAlbumBySlug(@Param('slug') slug: string) {
    const album = await this.albumsService.findPublishedAlbumBySlug(slug);
    if (!album) throw new NotFoundException(`Album ${slug} not found.`);
    return album;
  }
}
