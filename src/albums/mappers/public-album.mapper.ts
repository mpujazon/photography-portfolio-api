import { Album, Photo } from '../../../generated/prisma/client';
import { PublicAlbumResponseDto, PublicPhotoResponseDto } from '../dto/album-response.dto';

type AlbumWithPhotos = Album & { photos?: Photo[] };

function mapPhotoToPublicResponse(photo: Photo): PublicPhotoResponseDto {
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

export function mapAlbumToPublicResponse(album: AlbumWithPhotos): PublicAlbumResponseDto {
  return {
    id: album.id,
    title: album.title,
    slug: album.slug,
    description: album.description ?? null,
    coverPhotoUrl: album.coverPhotoId
      ? `https://res.cloudinary.com/.../${album.coverPhotoId}`
      : null,
    isFeatured: album.isFeatured,
    ...(album.photos && { photos: album.photos.map(mapPhotoToPublicResponse) }),
  };
}
