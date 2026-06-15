import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { SiteConfigService } from './site-config.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/site-config')
export class AdminSiteConfigController {
  constructor(private siteConfig: SiteConfigService) {}

  @Get()
  findAll() {
    return this.siteConfig.findAll();
  }

  @Patch()
  update(@Body() body: Record<string, string>) {
    return this.siteConfig.updateMany(body);
  }
}
