import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager/dist';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from '@redis/client';
import { CustomInterceptor } from './custom-cache.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisConfig from '../redis.config';
import { CacheInvalidationModule } from './cache-invalidation/cache-invalidation.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeModule } from './coffee/coffee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'localhost',
        password: 'pass123',
        port: 5432,
        username: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        database: 'postgres',
      },
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [redisConfig],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: (config: ConfigService) => ({
        store: redisStore.create({
          host: config.get('redisConfig.host', { infer: true }),
          port: config.get('redisConfig.port', { infer: true }),
          password: config.get<number>('redisConfig.password'),
          // port: 44933,
          // password: "h4VZZCYjUs0va2yoUY3",
        }), // need to install version 2 of cache-manager-redis-store to fix error
        max: 1000,
        ttl: 0,
      }),

      inject: [ConfigService],
    }), CacheInvalidationModule, UsersModule, CoffeeModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: CustomInterceptor,
  }],
})
export class AppModule {
}
