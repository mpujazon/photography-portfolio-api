import { Module } from '@nestjs/common';
import { SiteConfigService } from './site-config.service';
import { PublicSiteConfigController } from './public-site-config.controller';
import { AdminSiteConfigController } from './admin-site-config.controller';
import { PrismaService } from '../prisma-service/prisma.service';

@Module({
  providers: [SiteConfigService, PrismaService],
  controllers: [PublicSiteConfigController, AdminSiteConfigController],
})
export class SiteConfigModule {}
