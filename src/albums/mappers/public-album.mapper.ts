import { Album, Photo } from '../../../generated/prisma/client';
import { PublicAlbumResponseDto } from '../dto/album-response.dto';
import { mapPhotoToPublicResponse } from '../../photos/mappers/public-photo.mapper';

type AlbumWithPhotos = Album & {
  photos?: Photo[];
  _count?: { photos: number };
};

export function mapAlbumToPublicResponse(album: AlbumWithPhotos): PublicAlbumResponseDto {
  return {
    id: album.id,
    title: album.title,
    subtitle: album.subtitle,
    slug: album.slug,
    description: album.description ?? null,
    coverPhotoUrl: album.coverPhotoUrl ?? null,
    isFeatured: album.isFeatured,
    numberOfPhotos: album._count?.photos ?? album.photos?.length ?? 0,
    ...(album.photos && { photos: album.photos.map(mapPhotoToPublicResponse) }),
  };
}
