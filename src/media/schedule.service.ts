import { Injectable } from '@nestjs/common';
import { Cron, Timeout, NestSchedule } from 'nest-schedule';
import { MediaService } from './media.service';

@Injectable()
export class ScheduleService extends NestSchedule {

  constructor(private readonly mediaService: MediaService) {
    super();
  }

  // run a daily cron at 8:37 and instantly on first run
  @Cron('37 8 * * *', {
    immediate: true
  })
  async dailyCron() {
    return this.fetchAllShows();
  }

  private async fetchAllShows() {
    console.log('Fetching shows: ' + new Date());
    await this.mediaService.fetchNewShows();
    await this.mediaService.fetchNewMovies();
  }
}
