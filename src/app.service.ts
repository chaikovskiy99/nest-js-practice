import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private players: any = [
    {
      id: 123,
      firstName: 'Lucas',
      lastName: 'Bergval',
      age: 19,
    },
    {
      id: 124,
      firstName: 'Archie',
      lastName: 'Gray',
      age: 20,
    },
    {
      id: 124,
      firstName: 'James',
      lastName: 'Donley',
      age: 21,
    },
  ];
  // @Inject(CACHE_MANAGER) private cacheManager: Cache
   constructor() {
  }

  async getHello() {
    // await this.cacheManager.set('x', 'y', 1000);
    // await this.cacheManager.get('x');
    // await this.cacheManager.del('x');
    // await this.cacheManager.reset();
    // console.log('called');
    return this.players;
  }
}