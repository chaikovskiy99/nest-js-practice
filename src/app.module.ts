import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager/dist';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from '@redis/client';
import { CustomInterceptor } from './custom-cache.interceptor';
import { CacheInvalidationModule } from './cache-invalidation/cache-invalidation.module';

@Module({
  imports: [CacheModule.register<RedisClientOptions>({
    isGlobal: true,
    store: redisStore.create({
      'host': '127.0.0.1',
      // port: 44933,
      // password: "h4VZZCYjUs0va2yoUY3",
    }), // need to install version 2 of cache-manager-redis-store to fix error
    max: 1000,
    ttl: 0,
  }), CacheInvalidationModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass:CustomInterceptor,
  }],
})
export class AppModule {
}
