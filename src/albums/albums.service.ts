import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prismaService: PrismaService) {}
}
