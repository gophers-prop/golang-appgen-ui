import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) {
  }

  get(path: string, option?: any) {
    const options = option ? option : {};
    return this.httpClient.get(`/${path}`, options)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  post(path: string, request?: any, option?: any) {
    const options = option ? option : {};
    return this.httpClient.post(`/${path}`, request ? request : {}, options)
      .pipe(
        map(res => {
          return res;
        })
      );
  }
}
