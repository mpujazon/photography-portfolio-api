export class PublicPhotoResponseDto {
  id: number;
  url: string;
  title: string;
  category: string;
  description: string | null;
  isFeatured: boolean;
  cameraSettings: object | null;
}

export class PublicAlbumResponseDto {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverPhotoUrl: string | null;
  isFeatured: boolean;
  photos?: PublicPhotoResponseDto[];
}
