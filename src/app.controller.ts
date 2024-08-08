import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
// @CacheTTL(400)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @CacheKey('test_key')
  @Get()
  async getHello() {
    return await this.appService.getHello();
  }
}
