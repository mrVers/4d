import './config';

import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(process.env.API_PORT);
  console.log('API running on port: ' + process.env.API_PORT);
}
bootstrap();
