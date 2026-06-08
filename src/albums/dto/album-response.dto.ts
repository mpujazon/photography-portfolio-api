export class PublicAlbumResponseDto {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  layoutType: string;
  coverPhotoUrl: string | null;
}
