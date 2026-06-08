import { Controller, Get } from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('public/albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Get()
  findPublishedAlbums() {
    return this.albumsService.findPublishedAlbums();
  }
}
