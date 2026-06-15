import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/photos')
export class AdminPhotosController {
  constructor(private photos: PhotosService) {}

  @Get()
  findAll() {
    return this.photos.findAllAdmin();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title?: string; category?: string; albumId?: string },
  ) {
    return this.photos.upload(file, body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.photos.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photos.remove(id);
  }
}
