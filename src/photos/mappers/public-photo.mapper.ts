import { Photo } from '../../../generated/prisma/client';
import { PublicPhotoResponseDto } from '../dto/public-photo-response.dto';

export function mapPhotoToPublicResponse(photo: Photo): PublicPhotoResponseDto {
  return {
    id: photo.id,
    url: photo.url,
    title: photo.title,
    category: photo.category,
    description: photo.description ?? null,
    isFeatured: photo.isFeatured,
    cameraSettings: (photo.cameraSettings as object) ?? null,
  };
}
