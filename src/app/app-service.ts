import {Injectable} from '@angular/core';
import {HttpService} from './common/http-service/http.service';


@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {
  }

  private static readonly SIMPLE_APP_URL: string = 'simple-app';

  private static readonly EXPLORE_APP_URL = 'explore-app';

  private static readonly APP_COUNT_URL = 'app-count';

  getBoilerPlate(request) {
    return this.httpService.post(AppService.SIMPLE_APP_URL, request, {responseType: 'arraybuffer'});
  }

  exploreBoilerPlate(request) {
    return this.httpService.post(AppService.EXPLORE_APP_URL, request, {responseType: 'arraybuffer'});
  }

  counter() {
    return this.httpService.get(AppService.APP_COUNT_URL, {responseType: 'json'});
  }
}
