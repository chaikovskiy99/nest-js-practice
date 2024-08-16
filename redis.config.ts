import * as process from 'node:process';
import { registerAs } from '@nestjs/config';

export default registerAs ('redisConfig',() => ({
  port: parseInt(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
  password: process.env.REDIS_PASSWORD,
}))