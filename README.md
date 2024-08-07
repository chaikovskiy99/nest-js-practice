## Bootstrap a nestjs project.

## npm install @nestjs/cache-manager cache-manager


```
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager/dist';

@Module({
  imports: [CacheModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## then use cacheManager in your service 
```service example
import { Inject, Injectable } from '@nestjs/common';
import {Cache} from 'cache-manager'
import {CACHE_MANAGER} from '@nestjs/cache-manager';

@Injectable()
export class AppService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('x', 'y' , 1000)
  }
}
```