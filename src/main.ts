import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(Logger)
  app.useLogger(['log', 'debug', 'error', 'warn', 'verbose', 'fatal'])
  await app.listen(3000);

}



bootstrap().then().catch(e => console.log(e));
