import { PublicPhotoResponseDto } from '../../photos/dto/public-photo-response.dto';

export { PublicPhotoResponseDto };

export class PublicAlbumResponseDto {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string | null;
  coverPhotoUrl: string | null;
  isFeatured: boolean;
  numberOfPhotos: number;
  photos?: PublicPhotoResponseDto[];
}
