import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { ScheduleModule } from 'nest-schedule';

@Module({
  imports: [
    MediaModule,
    ScheduleModule.register()
  ]
})
export class ApplicationModule {}
