import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(Logger)
  app.useLogger(['log', 'debug', 'error', 'warn', 'verbose', 'fatal'])
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true // no need to use @Type annotation
    }
  }))
  await app.listen(3000);

}



bootstrap().then().catch(e => console.log(e));
