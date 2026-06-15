import { Controller, Get } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('public/photos')
export class PublicPhotosController {
  constructor(private photos: PhotosService) {}

  @Get('featured')
  findFeatured() {
    return this.photos.findFeatured();
  }
}
