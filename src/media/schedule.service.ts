import { Injectable } from '@nestjs/common';
import { Cron, Timeout, NestSchedule } from 'nest-schedule';
import { MediaService } from './media.service';

@Injectable()
export class ScheduleService extends NestSchedule {

  constructor(private readonly mediaService: MediaService) {
    super();
  }

  // run a daily cron at random time between 7-10am
  @Cron('H H(7-10) * * *')
  async dailyCron() {
    return this.fetchAllShows();
  }

  // run just once when the api starts
  @Timeout(5000)
  firstRun() {
    return this.fetchAllShows();
  }

  private async fetchAllShows() {
    console.log('Fetching shows: ' + new Date());
    await this.mediaService.fetchNewShows();
    await this.mediaService.fetchNewMovies();
  }
}
