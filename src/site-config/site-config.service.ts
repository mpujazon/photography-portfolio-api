import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';

@Injectable()
export class SiteConfigService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.siteConfig.findMany();
  }

  async updateMany(entries: Record<string, string>) {
    await this.prisma.$transaction(
      Object.entries(entries).map(([key, value]) =>
        this.prisma.siteConfig.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        }),
      ),
    );
    return this.prisma.siteConfig.findMany();
  }
}
