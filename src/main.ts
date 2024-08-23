import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(Logger)
  app.useLogger(['log', 'debug', 'error', 'warn', 'verbose', 'fatal']);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true, // no need to use @Type annotation
    },
  }));
  app.useGlobalGuards(new ApiKeyGuard())
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);

}


bootstrap().then().catch(e => console.log(e));
