import { Test, TestingModule } from '@nestjs/testing';
import { AlbumsService } from './albums.service';
import { PrismaService } from '../prisma-service/prisma.service';

const mockPrismaService = {
  album: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('AlbumsService', () => {
  let service: AlbumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AlbumsService>(AlbumsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should return the album when slug exists and album is published', async () => {
    mockPrismaService.album.findUnique.mockResolvedValue({
      id: '8d742263-5c96-4960-84df-0e6093c03de3',
      title: 'Street Photography',
      slug: 'street-photography',
      description: 'A collection of urban and street photography.',
      layoutType: 'MASONRY',
      orderIndex: 1,
      coverPhotoId: null,
      isPublished: true,
      createdAt: '2026-06-08T09:11:43.511Z',
      updatedAt: '2026-06-08T09:15:40.489Z',
    });
    const result = await service.findPublishedAlbumBySlug('street-photography');
    expect(result).toEqual({
      id: '8d742263-5c96-4960-84df-0e6093c03de3',
      title: 'Street Photography',
      slug: 'street-photography',
      description: 'A collection of urban and street photography.',
      layoutType: 'MASONRY',
      coverPhotoUrl: null,
    });
  });
  it('should return null when slug does not exist', async ()=> {
    mockPrismaService.album.findUnique.mockResolvedValue(null);
    const result = await service.findPublishedAlbumBySlug('does-not-exist');
    expect(result).toEqual(null);
  });
  it('should query with isPublished filter', async () => {
    mockPrismaService.album.findUnique.mockResolvedValue(null);

    await service.findPublishedAlbumBySlug('street-photography');

    expect(mockPrismaService.album.findUnique).toHaveBeenCalledWith({
      where: { slug: 'street-photography', isPublished: true },
    });
  });
});
