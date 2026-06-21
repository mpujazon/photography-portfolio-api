export class PublicPhotoResponseDto {
  id: number;
  url: string;
  title: string;
  category: string;
  description: string | null;
  isFeatured: boolean;
  cameraSettings: object | null;
}
