import { Album } from '../../../generated/prisma/client';
import { PublicAlbumResponseDto } from '../dto/album-response.dto';

export function mapAlbumToPublicResponse(album: Album): PublicAlbumResponseDto {
  return {
    id: album.id,
    title: album.title,
    slug: album.slug,
    description: album.description || null,
    layoutType: album.layoutType,
    coverPhotoUrl: album.coverPhotoId
      ? `https://res.cloudinary.com/.../${album.coverPhotoId}`
      : null,
  };
}
