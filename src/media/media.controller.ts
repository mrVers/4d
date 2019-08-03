import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MediaService } from './media.service';
import { RtvService } from './rtv.service';
import { FrontMedia, MediaDto } from './schema/media.model';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly rtvService: RtvService
  ) {
  }

  @Get()
  async findAll(): Promise<FrontMedia> {
    return this.mediaService.getAll();
  }

  @Get('docs')
  async getDocs(): Promise<MediaDto[]> {
    return this.mediaService.getDocs();
  }

  @Get('movies')
  async getMovies(): Promise<MediaDto[]> {
    return this.mediaService.getMovies();
  }

  @Get('rtv/:id')
  async getShowById(@Param('id') id: string): Promise<any> {
    return await this.rtvService.getSingleVideo(id);
  }

  @Get('find/:id')
  async findShowById(@Param('id') id: string): Promise<MediaDto> {
    return this.mediaService.findOne(id);
  }

  @Get('getShows')
  async getNewShows(): Promise<string> {
   return await this.mediaService.fetchNewShows();
  }

  @Get('getMovies')
  async getNewMovies(): Promise<string> {
    return await this.mediaService.fetchNewMovies();
  }

  @Post('search')
  async searchQuery(@Body() query: { search: string }): Promise<MediaDto[]> {
    return this.mediaService.search(query.search);
  }

}
