import { Injectable } from '@nestjs/common';
import { CacheInvalidationService } from './cache-invalidation/cache-invalidation.service';
// import { CreatePlayerDTO } from './dto/createPlayerDTO';

@Injectable()
export class AppService {
  private collection = [];

  // @Inject(CACHE_MANAGER) private cacheManager: Cache
  constructor(
    private readonly cacheInvalidationService: CacheInvalidationService,
  ) {}

  async findCity(cityName: string) {
    if (cityName) {
      return this.collection.find((c) => c.title === cityName);
    }else {
      return 'Welcome to players website!';
    }
    // await this.cacheManager.set('x', 'y', 1000);
    // await this.cacheManager.get('x');
    // await this.cacheManager.del('x');
    // await this.cacheManager.reset();
    // console.log('called');
    
  }

  async getAllCities() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // this.cacheInvalidationService.set('/cities', this.collection, 0);
        return resolve(this.collection);
        
      }, 1000);
    });
  }

  createCity(title: string) {
    this.collection.push(title);
    this.cacheInvalidationService.del('/cities');
    return title;
  }
}
