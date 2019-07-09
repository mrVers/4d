import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class RtvService {

  constructor(private readonly httpService: HttpService) {}

  getAllShows(): Promise<any> {

    // callback used in the browser request, we keep it so we don't act suspicious
    const callback = 'jQuery112406627142731271161_1556794600130';
    // the api request as performed by the browser, searching documentaries
    const url = `https://api.rtvslo.si/ava/getSearch?client_id=${process.env.CLIENT_ID}&q=&showTypeId=15890840&sort=date&order=desc&pageSize=99&pageNumber=0&source=&hearingAid=0&clip=show&from=2007-01-01&to=&WPId=&zkp=0&callback=${callback}&_=1556794600131`;

    return this.httpService.get(url,
      // todo; set headers?
    ).toPromise()
      .then(res => this.parseData(res.data, callback).response)
      .catch(err => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });
  }

  getSingleVideo(id: string): Promise<any> {

    // callback used in the browser request, we keep it so we don't act suspicious
    const callback = 'ava_924';

    return this.httpService.get(`https://api.rtvslo.si/ava/getRecording/${id}?callback=${callback}&client_id=${process.env.CLIENT_ID}&session_id=${process.env.SESSION_ID}`).toPromise()
      .then(res => this.parseData(res.data, callback).response)
      .catch(err => {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      });

  }

  private parseData(data: string, cb: string) {
    // trim json wrappers
    const parsedData = data.replace(`${cb}(`, '');
    return JSON.parse(parsedData.substring(0, parsedData.length - 2));
  }
}
