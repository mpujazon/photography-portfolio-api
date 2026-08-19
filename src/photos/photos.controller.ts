import { Controller, Get } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('public/photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get('/featured')
  findFeaturedPhotos() {
    return this.photosService.findFeaturedPhotos();
  }
}
