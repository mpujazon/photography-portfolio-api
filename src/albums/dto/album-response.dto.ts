export class PublicAlbumResponseDto {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverPhotoUrl: string | null;
  isFeatured:   boolean;
}
