import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/albums')
export class AdminAlbumsController {
  constructor(private albums: AlbumsService) {}

  @Get()
  findAll() {
    return this.albums.findAllAdmin();
  }

  @Post()
  create(@Body() body: { title: string; slug: string; description?: string }) {
    return this.albums.create(body);
  }

  @Patch('reorder')
  reorder(@Body() items: { id: string; orderIndex: number }[]) {
    return this.albums.reorder(items);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.albums.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albums.remove(id);
  }
}
