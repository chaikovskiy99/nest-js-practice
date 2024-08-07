import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager/dist';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from '@redis/client';

@Module({
  imports: [CacheModule.register<RedisClientOptions>({
    isGlobal: true,
    store: redisStore.create({
      host: '127.0.0.1',
      port: 6379,
    }), // need to install version 2 of cache-manager-redis-store to fix error
    max: 1000,
    ttl: 0,
  })],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  }],
})
export class AppModule {
}
