import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PhotosService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  findFeatured() {
    return this.prisma.photo.findMany({
      where: { isFeatured: true, isPublished: true },
      orderBy: { orderIndex: 'asc' },
    });
  }

  findAllAdmin() {
    return this.prisma.photo.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async upload(
    file: Express.Multer.File,
    data: { title?: string; category?: string; albumId?: string },
  ) {
    const result = await this.cloudinary.upload(file);
    return this.prisma.photo.create({
      data: {
        title: data.title ?? file.originalname,
        imageUrl: result.secure_url,
        cloudinaryId: result.public_id,
        category: data.category,
        albumId: data.albumId,
      },
    });
  }

  async update(id: string, data: Record<string, unknown>) {
    await this.ensureExists(id);
    return this.prisma.photo.update({ where: { id }, data });
  }

  async remove(id: string) {
    const photo = await this.ensureExists(id);
    if (photo.cloudinaryId) await this.cloudinary.delete(photo.cloudinaryId);
    return this.prisma.photo.delete({ where: { id } });
  }

  private async ensureExists(id: string) {
    const photo = await this.prisma.photo.findUnique({ where: { id } });
    if (!photo) throw new NotFoundException('Photo not found');
    return photo;
  }
}
