import {Injectable} from "@angular/core";
import {HttpService} from "./common/http-service/http.service";
import {environment} from "../environments/environment";


@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {
  }

  private static readonly SIMPLE_APP_URL: string = 'simple-app';

  private static readonly EXPLORE_APP_URL = 'explore-app';

  private static readonly APP_COUNT_URL = 'app-count';

  getBoilerPlate(request) {
    const url = environment.serverUrl + AppService.SIMPLE_APP_URL;
    return this.httpService.post(url, request, {responseType: 'arraybuffer'});
  }

  exploreBoilerPlate(request) {
    const url = environment.serverUrl + AppService.EXPLORE_APP_URL;
    return this.httpService.post(url, request, {responseType: 'arraybuffer'});
  }

  counter() {
    const url = environment.serverUrl + AppService.APP_COUNT_URL;
    return this.httpService.get(url, {responseType: 'json'});
  }
}
