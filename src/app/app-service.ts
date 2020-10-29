import {Injectable} from "@angular/core";
import {HttpService} from "./common/http-service/http.service";
import {environment} from "../environments/environment";


@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {
  }

  getBoilerPlate(request) {
    const url = environment.serverUrl + "/simpleapp";
    return this.httpService.post(url, request, {responseType: 'arraybuffer'});
  }

  exploreBoilerPlate(request) {
    const url = environment.serverUrl + "/exploreapp";
    return this.httpService.post(url, request, {responseType: 'arraybuffer'});
  }

  counter() {
    const url = environment.serverUrl + "/appcount";
    return this.httpService.get(url, {responseType: 'json'});
  }
}
