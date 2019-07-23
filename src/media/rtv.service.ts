import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class RtvService {

  config = {
    headers: { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36' }
  };

  pageSize = 12;

  constructor(private readonly httpService: HttpService) {}

  getAllShows(): Promise<any> {

    // callback used in the browser request, we keep it so we don't act suspicious
    const callback = `jQuery112406627142731271161_${+new Date()}`;
    // the api request as performed by the browser, searching documentaries
    const url = `https://api.rtvslo.si/ava/getSearch?client_id=${process.env.CLIENT_ID}&q=&showTypeId=15890840&sort=date&order=desc&pageSize=${this.pageSize}&pageNumber=0&source=&hearingAid=0&clip=show&from=2007-01-01&to=&WPId=&zkp=0&callback=${callback}&_=${+new Date()}`;

    return this.httpService.get(url, this.config).toPromise()
      .then(res => this.parseData(res.data, callback).response)
      .catch(err => {
        console.log(err);
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
  }

  getSingleVideo(id: string): Promise<any> {

    // callback used in the browser request, we keep it so we don't act suspicious
    const callback = `ava_${Math.floor(Math.random() * 1000)}`;
    const url = `https://api.rtvslo.si/ava/getRecording/${id}?callback=${callback}&client_id=${process.env.CLIENT_ID}&session_id=${process.env.SESSION_ID}`;

    return this.httpService.get(url, this.config).toPromise()
      .then(res => this.parseData(res.data, callback).response)
      .catch(err => {
        console.log(err);
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });

  }

  private parseData(data: string, cb: string) {
    // trim json wrappers
    const parsedData = data.replace(`${cb}(`, '');
    return JSON.parse(parsedData.substring(0, parsedData.length - 2));
  }

  getAllMovies(): Promise<any> {

    // callback used in the browser request, we keep it so we don't act suspicious
    const callback = `jQuery112406627142731271161_${+new Date()}`;
    // the api request as performed by the browser, searching documentaries
    const url = `https://api.rtvslo.si/ava/getSearch?client_id=${process.env.CLIENT_ID}&q=&showTypeId=15890841&sort=date&order=desc&pageSize=${this.pageSize}&pageNumber=0&source=&hearingAid=0&clip=show&from=2007-01-01&to=&WPId=&zkp=0&callback=${callback}&_=${+new Date()}`;

    return this.httpService.get(url, this.config).toPromise()
      .then(res => this.parseData(res.data, callback).response)
      .catch(err => {
        console.log(err);
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
  }
}
