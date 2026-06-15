import { Controller, Get } from '@nestjs/common';
import { SiteConfigService } from './site-config.service';

@Controller('public/site-config')
export class PublicSiteConfigController {
  constructor(private siteConfig: SiteConfigService) {}

  @Get()
  findAll() {
    return this.siteConfig.findAll();
  }
}
