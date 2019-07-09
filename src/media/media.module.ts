import { HttpModule, Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { RtvService } from './rtv.service';
import { Connection } from 'mongoose';
import { MediaSchema } from './schema/media.schema';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    HttpModule,
    DatabaseModule
  ],
  controllers: [MediaController],
  providers: [
    MediaService,
    RtvService,
    {
      provide: 'MEDIA_MODEL',
      useFactory: (connection: Connection) => connection.model('Media', MediaSchema),
      inject: ['DATABASE_CONNECTION'],
    }
  ],
})
export class MediaModule {
}
