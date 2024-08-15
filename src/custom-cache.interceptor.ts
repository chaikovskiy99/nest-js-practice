import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomInterceptor extends CacheInterceptor {
  private logger = new Logger(CustomInterceptor.name);
  // protected isRequestCacheable(context: ExecutionContext): boolean {
  //   const httpContext = context.switchToHttp();
  //   const request = httpContext.getRequest();
  //
  //   const handler = context.getHandler()
  //   this.logger.log(handler.name)
  //   const ignoreCache = this.reflector.get<boolean>('ignore',
  //     context.getHandler);
  //   this.logger.log(ignoreCache, this)
  //     return !ignoreCache || request.method === 'GET';
  //
  // }

  // async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
  //   const request = context.switchToHttp().getRequest();

  //   let cacheKey = this.trackBy(context);

  //   // If cacheKey is undefined, generate one manually
  //   if (!cacheKey) {
  //     cacheKey = this.generateCacheKey(request);
  //   }

  //   this.logger.log(`${cacheKey} - key`, this)


  //   if (this.shouldInvalidate(request)) {
  //     this.cacheManager.del(cacheKey);
  //   }
  //   return super.intercept(context, next);
  //   // return next.handle().pipe(
  //   //   tap((response) => {
  //   //     // After the route handler has returned, cache the new data
  //   //     if (cacheKey && response) {
  //   //       this.cacheManager.set(cacheKey, response, { ttl: 0 }); // Adjust TTL as needed
  //   //     }
  //   //   })
  //   // );
  // }

  private generateCacheKey(request: any): string {
    // Example: Use method + URL as the cache key
    return `${request.method}:${request.url}`;
  }

  private shouldInvalidate(request: any): boolean {
    return ['POST', 'PUT', 'DELETE'].includes(request.method);
  }

  protected trackBy(context: ExecutionContext): string | undefined {
    const isExcluded = this.reflector.getAllAndOverride<boolean>(
      'ignore',
      [context.getHandler(), context.getClass()],
    );
    this.logger.log(isExcluded);
    if (isExcluded) {
      return undefined; // Skip caching
    }
    return super.trackBy(context); // Apply caching normally
  }
}